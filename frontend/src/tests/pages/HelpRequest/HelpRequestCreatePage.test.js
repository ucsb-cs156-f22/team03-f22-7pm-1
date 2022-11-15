import { render, waitFor, fireEvent } from "@testing-library/react";
import HelpRequestCreatePage from "main/pages/HelpRequest/HelpRequestCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
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

describe("HelpRequestCreatePage tests", () => {

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
                    <HelpRequestCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("when you fill in the form and hit submit, it makes a request to the backend", async () => {

        const queryClient = new QueryClient();
        const request = {
            id: 17,
            requesterEmail: "bob@ucsb.edu",
            teamId: "6pm-2",
            tableOrBreakoutRoom: "table 1",
            requestTime: "2022-02-02T00:00",
            explanation: "Question about Stryker",
            solved: false
        };

        axiosMock.onPost("/api/helprequest/post").reply( 202, request );

        const { getByTestId } = render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <HelpRequestCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(getByTestId("HelpRequestForm-requesterEmail")).toBeInTheDocument();
        });

        const requesterEmailField = getByTestId("HelpRequestForm-requesterEmail");
        const teamIdField = getByTestId("HelpRequestForm-teamId");
        const tableOrBreakoutRoomField = getByTestId("HelpRequestForm-tableOrBreakoutRoom");
        const requestTimeField = getByTestId("HelpRequestForm-requestTime");
        const explanationField = getByTestId("HelpRequestForm-explanation");
        const solvedField = getByTestId("HelpRequestForm-solved");
        const submitButton = getByTestId("HelpRequestForm-submit");

        fireEvent.change(requesterEmailField, { target: { value: 'bob@ucsb.edu' } });
        fireEvent.change(teamIdField, { target: { value: '6pm-3' } });
        fireEvent.change(tableOrBreakoutRoomField, { target: { value: 'Breakout Room 6pm-3' } });
        fireEvent.change(requestTimeField, { target: { value: '2022-01-02T12:00' } });
        fireEvent.change(explanationField, { target: { value: 'Explaining Code Coverage' } });
        fireEvent.change(solvedField, { target: { value: false } });

        expect(submitButton).toBeInTheDocument(); //try before line 94?

        fireEvent.click(submitButton);

        await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

        expect(axiosMock.history.post[0].params).toEqual(
            {
                "requesterEmail": 'bob@ucsb.edu',
                "teamId": '6pm-3',
                "tableOrBreakoutRoom": 'Breakout Room 6pm-3',
                "requestTime": '2022-01-02T12:00',
                "explanation": 'Explaining Code Coverage',
                "solved": false
        });

        expect(mockToast).toBeCalledWith("New helpRequest Created - id: 17 requesterEmail: bob@ucsb.edu");
        expect(mockNavigate).toBeCalledWith({ "to": "/helprequest/list" });
    });


});


