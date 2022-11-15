const helpRequestFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "sam@ucsb.edu",
        "teamId": "7pm-1",
        "tableOrBreakoutRoom": "Table 3",
        "requestTime": "2022-01-02T12:00:00",
        "explanation": "Need Help with Merge Conflicts",
        "solved": "false"
    },
    threeRequests: [
        {
            "id": 1,
            "requesterEmail": "sam@ucsb.edu",
            "teamId": "7pm-1",
            "tableOrBreakoutRoom": "Table 3",
            "requestTime": "2022-01-02T12:00:00",
            "explanation": "Need Help with Merge Conflicts",
            "solved": "true"
        },
        {
            "id": 2,
            "requesterEmail": "JavaScript@ucsb.edu",
            "teamId": "5pm-3",
            "tableOrBreakoutRoom": "Table 1",
            "requestTime": "2022-04-03T12:00:00",
            "explanation": "Question about Swagger",
            "solved": "true"
        },
        {
            "id": 3,
            "requesterEmail": "taya@ucsb.edu",
            "teamId": "6pm-2",
            "tableOrBreakoutRoom": "Breakout room 6pm-2",
            "requestTime": "2022-07-04T12:00:00",
            "explanation": "Need Help With Mutation Testing",
            "solved": "false"
        }
    ]
};


export { helpRequestFixtures };