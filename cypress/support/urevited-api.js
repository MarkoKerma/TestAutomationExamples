class UrevitedAPI {
  urevitedRequest(bodyObject) {
    return new Cypress.Promise((resolve) => {
      cy.request({
        method: 'POST',
        url: 'https://dev.api.urevited.com/core-api/graphql',
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('Token'),
        },
        body: bodyObject,
      }).then((response) => resolve(response));
    });
  }
  venueSearchableAPI(venueName) {
    cy.request({
      method: 'POST',
      url: 'https://dev.api.urevited.com/core-api/graphql',
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('Token'),
        'content-type': 'application/json',
        authority: '',
      },
      body: {
        operationName: 'Venues',
        variables: {
          filter: {
            textFilter: `${venueName}`,
          },
          order: {
            name: 'ASC',
            id: 'ASC',
          },
          skip: 0,
          take: 10,
        },
        query: `query Venues($filter: VenuesFilterInput, $order: [VenuePayloadSortInput!], $skip: Int, $take: Int) {\n  venues(filter: $filter, order: $order, skip: $skip, take: $take) {\n    items {\n      id\n      name\n      address\n      __typename\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      __typename\n    }\n    totalCount\n    __typename\n  }\n}`,
      },
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.data.venues.items[0].name).equal(venueName);
    });
  }
}

export default UrevitedAPI;
