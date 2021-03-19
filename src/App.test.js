import { render, screen } from "@testing-library/react";
import App from "./App";
import MovieDetails from "./components/movieDetails";

test("Movie Details", () => {
  it("shows a date", () => {
    let mockMovie = {
      name: "Some Title",
      description: "Something",
      release_date: "1998",
    };

    render(<MovieDetails movie={mockMovie} />);
    expect(screen.getByText("1998")).toBeInTheDocument();
  });
});
