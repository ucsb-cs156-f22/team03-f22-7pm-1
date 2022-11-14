import { render, waitFor, fireEvent } from "@testing-library/react";
import MenuItemReviewsForm from "main/components/MenuItemReviews/MenuItemReviewsForm";
import { menuItemReviewsFixtures } from "fixtures/menuItemReviewsFixtures";
import { BrowserRouter as Router } from "react-router-dom";

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedNavigate
}));


describe("MenuItemReviewsForm tests", () => {

    test("renders correctly ", async () => {

        const { getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByText(/ItemId/)).toBeInTheDocument());
        await waitFor(() => expect(getByText(/Create/)).toBeInTheDocument());
    });


    test("renders correctly when passing in a review ", async () => {

        const { getByText, getByTestId } = render(
            <Router  >
                <MenuItemReviewsForm initialMenuItemReview ={menuItemReviewsFixtures.oneReview}  buttonLabel={"Update"} />
            </Router>
        );
        await waitFor(() => expect(getByTestId(/MenuItemReviewsForm-id/)).toBeInTheDocument());
        expect(getByText(/id/)).toBeInTheDocument();
        await waitFor( () => expect(getByTestId(/MenuItemReviewsForm-id/)).toHaveValue("2") );
    });

    test("Correct Error messsages on bad input", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-id")).toBeInTheDocument());
        const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");

        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(dateReviewedField, { target: { value: 'bad-input' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/dateReviewed must be in ISO format, e.g. 2022-01-02T15:30/)).toBeInTheDocument());

    });

    test("Correct Error messsages when stars exceeds max 5", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-id")).toBeInTheDocument());

        const starsField = getByTestId("MenuItemReviewsForm-stars");
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(starsField, { target: { value: '10' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Stars should be between 0 and 5/)).toBeInTheDocument());
        expect(getByText(/id is required/)).toBeInTheDocument();
    });


    test("Correct Error messsages when stars is below min 0", async () => {

        const { getByTestId, getByText } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-id")).toBeInTheDocument());
   
        const starsField = getByTestId("MenuItemReviewsForm-stars");
        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(starsField, { target: { value: '-2' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(getByText(/Stars should be between 0 and 5/)).toBeInTheDocument());
        expect(getByText(/id is required/)).toBeInTheDocument();
    });

    test("Test that navigate(-1) is called when Cancel is clicked", async () => {

        const { getByTestId } = render(
            <Router  >
                <MenuItemReviewsForm />
            </Router>
        );
        await waitFor(() => expect(getByTestId("MenuItemReviewsForm-cancel")).toBeInTheDocument());
        const cancelButton = getByTestId("MenuItemReviewsForm-cancel");

        fireEvent.click(cancelButton);

        await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith(-1));

    });

});


