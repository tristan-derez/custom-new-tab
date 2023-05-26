import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useState } from "react";

const axiosStoriesUrl =
  "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

const axiosSingleStory = "https://hacker-news.firebaseio.com/v0/item/";

type StoryItem = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  url: string;
};

const fetchStories = async (page: number): Promise<StoryItem[]> => {
  const response = await axios.get(axiosStoriesUrl);
  const start = (page - 1) * 5;
  const end = start + 5;
  const ids = response.data.slice(start, end);
  const stories = await Promise.all(
    ids.map(async (id: number) => {
      const itemResponse = await axios.get(
        `${axiosSingleStory}${id}.json?print=pretty`
      );
      return itemResponse.data;
    })
  );
  return stories;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const TopStories: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data: StoriesItems = [],
    isLoading,
    isError,
  } = useQuery(["stories", page], () => fetchStories(page), {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 580,
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (isLoading) {
    return (
      <Grid
        container
        minHeight='531.156px'
        minWidth='500px'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        className='loading'
      >
        <CircularProgress />
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid
        container
        minHeight='531.156px'
        minWidth='500px'
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        className='loading'
      >
        Error loading content
      </Grid>
    );
  }

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={2}
        className='topstories'
      >
        {StoriesItems.map((item: StoryItem) => (
          <Grid item key={item.id}>
            <Item>
              <a href={item.url}>{item.title}</a>
              <p>
                {item.score} points by {item.by} -{" "}
                {new Date(item.time * 1000).toLocaleDateString()}
              </p>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2} justifyContent='center' alignItems='center'>
        <Pagination
          count={StoriesItems.length}
          page={page}
          onChange={handlePageChange}
          shape='rounded'
        />
      </Stack>
    </div>
  );
};
