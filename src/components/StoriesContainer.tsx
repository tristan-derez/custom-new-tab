import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
  const ids = response.data.slice(0, 10);
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

export const StoriesContainer: React.FC = () => {
  const {
    data: StoriesItems = [],
    isLoading,
    isError,
  } = useQuery(["stories"], fetchStories);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching stories</div>;
  }

  return (
    <ul>
      {StoriesItems.map((item: StoryItem) => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
          <p>
            {item.score} points by {item.by} -{" "}
            {new Date(item.time * 1000).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  );
};
