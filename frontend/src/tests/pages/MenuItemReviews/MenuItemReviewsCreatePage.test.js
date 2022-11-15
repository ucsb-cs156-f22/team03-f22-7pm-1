import { render, waitFor, fireEvent } from "@testing-library/react";
import MenuItemReviewsCreatePage from "main/pages/MenuItemReviews/MenuItemReviewsCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures }  from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";


const mockToast = jest.fn();
jest.mock('react-toastify', () => {
    const originalModule = jest.requireActual('react-toastify');
    return {
        __esModule: true,
        ...originalModule,
        toast: (x) => mockToast(x)
    };
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalModule,
        Navigate: (x) => { mockNavigate(x); return null; }
    };
});


describe("MenuItemReviewsCreatePage tests", () => {

    const axiosMock =new AxiosMockAdapter(axios);

    beforeEach(() => {
        axiosMock.reset();
        axiosMock.resetHistory();
        axiosMock.onGet("/api/currentUser").reply(200, apiCurrentUserFixtures.userOnly);
        axiosMock.onGet("/api/systemInfo").reply(200, systemInfoFixtures.showingNeither);
    });

    test("renders without crashing", () => {
        const queryClient = new QueryClient();
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();

        const reviews = {
            "id": 2,
            "itemId": 22,
            "reviewerEmail": "abel@ucsb.edu",
            "stars": 2,
            "dateReviewed": "2022-01-02T15:31:00",
            "comments": "Norfy lol"
          };
        
    
        axiosMock.onPost("/api/menuitemreviews/post").reply( 202, reviews );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MenuItemReviewsCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("MenuItemReviewsForm-id")).toBeInTheDocument();
        });

        const idField = getByTestId("MenuItemReviewsForm-id");
        const itemIdField = getByTestId("MenuItemReviewsForm-itemId");
        const reviewerEmailField = getByTestId("MenuItemReviewsForm-reviewerEmail");
        const starsField = getByTestId("MenuItemReviewsForm-stars");
        const dateReviewedField = getByTestId("MenuItemReviewsForm-dateReviewed");
        const commentsField = getByTestId("MenuItemReviewsForm-comments");

        const submitButton = getByTestId("MenuItemReviewsForm-submit");

        fireEvent.change(idField, { target: { value: 2 } });
        fireEvent.change(itemIdField, { target: { value: 22 } });
        fireEvent.change(reviewerEmailField, { target: { value: "abel@ucsb.edu" } });
        fireEvent.change(starsField, { target: { value: 2 } });
        fireEvent.change(dateReviewedField, { target: { value: "2022-01-02T15:31:00" } });
        fireEvent.change(commentsField, { target: { value: "Norfy lol" } });

        expect(submitButton).toBeInTheDocument();

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual({
            "id": "2",
            "itemId": "22",
            "reviewerEmail": "abel@ucsb.edu",
            "stars": "2",
            "dateReviewed": "2022-01-02T15:31:00",
            "comments": "Norfy lol"
        });

        expect(mockToast).toBeCalledWith("New Menu Item Review Created - id: 2 itemId: 22");
        expect(mockNavigate).toBeCalledWith({ "to": "/menuitemreviews/list" });
    });


});


