import Search from "./components/search/Search";
import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 2rem;
  text-align: center;
  min-width: 300px;
  background-color: #0d0d0d;
  color: #f2f2f2;

  h2 {
    padding: 1rem;
    font-size: 40px;
    margin: 0 30%;
  }
`;

function App() {
  return (
    <PageWrapper data-testid="pageWrapper">
      <h2>List of technologies</h2>
      <div className="auto-container">
        <Search />
      </div>
    </PageWrapper>
  );
}

export default App;
