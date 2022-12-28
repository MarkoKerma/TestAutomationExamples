/// <reference types="cypress" />
import CustomJSCommands from "../../support/custom";
import UrevitedAPI from '../../support/urevited-api';

describe('Integration testing CRUD operations', () => {
    const customJSCommands = new CustomJSCommands();
    const urevitedAPI = new UrevitedAPI();

    const venueName = customJSCommands.randomName(6);
    const editedVenueName = customJSCommands.randomName(6);

    beforeEach(() => {
        cy.getLoginToken();
    });

    it('List Venues API', () => {
        urevitedAPI.urevitedRequest(
            {
                "operationName": "Venues",
                "variables": {
                    "filter": {
                        "textFilter": ""
                    },
                    "order": {
                        "name": "ASC",
                        "id": "ASC"
                    },
                    "skip": 0,
                    "take": 10
                },
                "query": "query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}"
            }
        ).then(response => {
            expect(response.body.data.venues.totalCount).to.be.greaterThan(0);
        });
    });

    it('Create Venue API', () => {
        urevitedAPI.urevitedRequest(
            {
                "operationName": "addVenue",
                "variables": {
                    "input": {
                        "name": venueName,
                        "address": "The Final Frontier"
                    }
                },
                "query": "mutation addVenue($input: VenueInput) {\n  addVenue(input: $input) {\n    id\n    name\n    address\n    __typename\n  }\n}"
            }
        ).then(response => {
            expect(response.status).equal(200);
            urevitedAPI.urevitedRequest(
                {
                    "operationName": "Venues",
                    "variables": {
                        "filter": {
                            "textFilter": venueName
                        },
                        "order": {
                            "name": "ASC",
                            "id": "ASC"
                        },
                        "skip": 0,
                        "take": 10
                    },
                    "query": "query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}"
                }
            ).then(response => {
                expect(response.body.data.venues.items[0].name).equal(venueName);
                const listOfVenues = response.body.data.venues.items;
                const createdVenue = listOfVenues.find((venue) => venue.name === venueName);
                expect(createdVenue.name).equal(venueName);
            })
        });
    });

    it('Edit Venue API', () => {
        urevitedAPI.urevitedRequest(
            {
                "operationName": "addVenue",
                "variables": {
                    "input": {
                        "name": venueName,
                        "address": "The Final Frontier"
                    }
                },
                "query": "mutation addVenue($input: VenueInput) {\n  addVenue(input: $input) {\n    id\n    name\n    address\n    __typename\n  }\n}"
            }
        ).then(response => {
            const venueId = response.body.data.addVenue.id;
            urevitedAPI.urevitedRequest(
                {
                    "operationName": "updateVenue",
                    "variables": {
                        "input": {
                            "id": venueId,
                            "name": editedVenueName,
                            "address": "The Final Frontier"
                        }
                    },
                    "query": "mutation updateVenue($input: UpdateVenueInput!) {\n  updateVenue(input: $input) {\n    id\n    name\n    address\n    __typename\n  }\n}"
                }
            ).then(response => {
                expect(response.body.data.updateVenue.name).equal(editedVenueName);
                urevitedAPI.urevitedRequest(
                    {
                        "operationName": "Venues",
                        "variables": {
                            "filter": {
                                "textFilter": editedVenueName
                            },
                            "order": {
                                "name": "ASC",
                                "id": "ASC"
                            },
                            "skip": 0,
                            "take": 10
                        },
                        "query": "query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}"
                    }
                ).then(response => {
                    expect(response.body.data.venues.items[0].name).equal(editedVenueName);
                })
            })
        });
    });

    it('Delete Venue API', () => {
        urevitedAPI.urevitedRequest(
            {
                "operationName": "Venues",
                "variables": {
                    "filter": {
                        "textFilter": ""
                    },
                    "order": {
                        "name": "ASC",
                        "id": "ASC"
                    },
                    "skip": 0,
                    "take": 10
                },
                "query": "query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}"
            }
        ).then(response => {
            const numberOfVenuesBefore = response.body.data.venues.totalCount;
            urevitedAPI.urevitedRequest(
                {
                    "operationName": "addVenue",
                    "variables": {
                        "input": {
                            "name": venueName,
                            "address": "The Final Frontier"
                        }
                    },
                    "query": "mutation addVenue($input: VenueInput) {\n  addVenue(input: $input) {\n    id\n    name\n    address\n    __typename\n  }\n}"
                }
            ).then(response => {
                const venueId = response.body.data.addVenue.id;
                urevitedAPI.urevitedRequest(
                    {
                        "operationName": "deleteVenue",
                        "variables": {
                            "venueId": venueId
                        },
                        "query": "mutation deleteVenue($venueId: Long!) {\n  deleteVenue(venueId: $venueId)\n}"
                    }
                ).then(response => {
                    expect(response.body.data.deleteVenue).to.be.true;
                    urevitedAPI.urevitedRequest(
                        {
                            "operationName": "Venues",
                            "variables": {
                                "filter": {
                                    "textFilter": ""
                                },
                                "order": {
                                    "name": "ASC",
                                    "id": "ASC"
                                },
                                "skip": 0,
                                "take": 10
                            },
                            "query": "query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}"
                        }
                    ).then(response => {
                        expect(response.body.data.venues.totalCount).equal(numberOfVenuesBefore);
                    })
                })
            });
        });
    });
});