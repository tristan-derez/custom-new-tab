import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { FormEvent, useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = `https://google.com/search?q=${input}`;
    window.location.href = url;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label='Search'
            id='fullWidth'
            onChange={handleChange}
            color='info'
          />
        </form>
      </Box>
    </div>
  );
};
