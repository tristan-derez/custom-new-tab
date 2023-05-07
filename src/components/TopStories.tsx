import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/stack";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

const fetchStories = async (): Promise<StoryItem[]> => {
  const response = await axios.get(axiosStoriesUrl);
  const ids = response.data.slice(0, 5);
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

export const TopStories: React.FC = () => {
  const {
    data: StoriesItems = [],
    isLoading,
    isError,
  } = useQuery(["stories"], fetchStories, {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 580,
  });

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching stories</div>;
  }

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={4}
        className='topstories'
      >
        {StoriesItems.map((item: StoryItem) => (
          <Grid item>
            <Item key={item.id}>
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
        <Pagination count={2} shape='rounded' />
      </Stack>
    </div>
  );
};
