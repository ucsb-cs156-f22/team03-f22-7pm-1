import { render, waitFor, fireEvent } from "@testing-library/react";
import ArticlesForm from "main/components/Articles/ArticlesForm";
import { articlesFixture } from "fixtures/articlesFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("ArticlesForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router>
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/title/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a Article ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <ArticlesForm initialArticles={articlesFixture.oneArticle}  buttonLabel={"Update"}/>
            </Router>
        );
        await waitFor(() => expect(getByTestId(/ArticlesForm-id/)).toBeInTheDocument());
        expect(getByText(/id/)).toBeInTheDocument();
        await waitFor(() => expect(getByTestId(/ArticlesForm-id/)).toHaveValue("1"));
    });


    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-id")).toBeInTheDocument());
        const dateAddedField = getByTestId("ArticlesForm-dateAdded");
        const submitButton = getByTestId("ArticlesForm-submit");

        fireEvent.change(dateAddedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/dateAdded must be in ISO format/)).toBeInTheDocument());
    });

    test("Correct Error messsages on missing input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-submit")).toBeInTheDocument());
        const submitButton = getByTestId("ArticlesForm-submit");

        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Title is required./)).toBeInTheDocument());
        expect(getByText(/Url is required./)).toBeInTheDocument();
        expect(getByText(/Explanation is required./)).toBeInTheDocument();
        expect(getByText(/Email is required./)).toBeInTheDocument();
        expect(getByText(/dateAdded is required./)).toBeInTheDocument();

    });

    test("No Error messsages on good input", async () => {

        const mockSubmitAction = jest.fn();


        const { getByTestId, queryByText } = render(
            <Router  >
                <ArticlesForm submitAction={mockSubmitAction} />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-title")).toBeInTheDocument());

        const titleField = getByTestId("ArticlesForm-title");
        const urlField = getByTestId("ArticlesForm-url");
        const explanationField = getByTestId("ArticlesForm-explanation");
        const emailField = getByTestId("ArticlesForm-email");
        const dateAddedField = getByTestId("ArticlesForm-dateAdded");
        const submitButton = getByTestId("ArticlesForm-submit");

        fireEvent.change(titleField, { target: { value: 'Using testing-playground with React Testing Library' } });
        fireEvent.change(urlField, { target: { value: 'https://dev.to/katieraby/using-testing-playground-with-react-testing-library-26j7' } });
        fireEvent.change(explanationField, { target: { value: 'Helpful when we get to front end development' } });
        fireEvent.change(emailField, { target: { value: 'phtcon@ucsb.edu' } });
        fireEvent.change(dateAddedField, { target: { value: '2022-04-20T12:00:00' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockSubmitAction).toHaveBeenCalled());

        expect(queryByText(/dateAdded must be in ISO format/)).not.toBeInTheDocument();

    });


    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <ArticlesForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("ArticlesForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("ArticlesForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});