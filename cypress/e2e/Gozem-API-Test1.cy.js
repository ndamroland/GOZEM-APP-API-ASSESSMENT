/// <reference types="cypress" />

// Describe the test suite for Gozem App's Booking API
describe(' GOZEM APP"S BOOKING API TEST SUITE ', () => {

    // Base URL for Restful Booker API
    const baseUrl = 'https://restful-booker.herokuapp.com';
    let bookingId; // Variable to store the booking ID

    // Test to create a booking
    it('Should successfully create a new booking - Test01', () => {

    // Define the request body for creating a booking
    const requestBody = {
            firstname: "Ndam",
            lastname: "Roland",
            totalprice: 846,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-09-01",
                checkout: "2024-09-03"
            },
            additionalneeds: "Breakfast"
        };

    // Make a POST request to create a booking
    cy.request('POST', `${baseUrl}/booking`, requestBody)
            .then((response) => {

    // Assertion to Validate the response status code
    expect(response.status).to.eq(200);

    // Assertion to Validate the response body contains booking details
                expect(response.body).to.have.property('bookingid');
                bookingId = response.body.bookingid; // Store the booking ID for later use
                expect(response.body.booking).to.have.property('firstname', 'Ndam');
                expect(response.body.booking).to.have.property('lastname', 'Roland');
                expect(response.body.booking).to.have.property('totalprice', 846);
                expect(response.body.booking).to.have.property('depositpaid', true);
                expect(response.body.booking.bookingdates).to.have.property('checkin', '2024-09-01');
                expect(response.body.booking.bookingdates).to.have.property('checkout', '2024-09-03');
                expect(response.body.booking).to.have.property('additionalneeds', 'Breakfast');
            });
    });

    // Test to get the booking created above
    it('Should retrieve the booking details using the booking ID - Test02', () => {

        // Ensure that the booking ID is defined
        expect(bookingId).to.not.be.undefined;

    // Make a GET request to retrieve the booking using the stored booking ID
    cy.request('GET', `${baseUrl}/booking/${bookingId}`)
            .then((response) => {

    // Assertion to Validate the response status code
    expect(response.status).to.eq(200);

    // Assertion to Validate the response body contains correct booking details
                expect(response.body).to.have.property('firstname', 'Ndam');
                expect(response.body).to.have.property('lastname', 'Roland');
                expect(response.body).to.have.property('totalprice', 846);
                expect(response.body).to.have.property('depositpaid', true);
                expect(response.body.bookingdates).to.have.property('checkin', '2024-09-01');
                expect(response.body.bookingdates).to.have.property('checkout', '2024-09-03');
                expect(response.body).to.have.property('additionalneeds', 'Breakfast');
            });
    });

    // Test to update the booking created above
    it('Should update the booking details successfully - Test03', () => {

        // Ensure that the booking ID is defined
        expect(bookingId).to.not.be.undefined;

    // Define the request body for updating the booking
     const updateRequestBody = {
            firstname: "Ndam",
            lastname: "Roland",
            totalprice: 846,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-09-05",
                checkout: "2024-09-10" // Updated checkout date
            },
            additionalneeds: "Dinner" // Updated additional needs
        };

    // Authentication for update (using Basic Auth or API token as per API documentation)
    const auth = {
            username: 'admin', // Example credentials, replace with actual if needed
            password: 'password123'
        };

        // Make a PUT request to update the booking
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/booking/${bookingId}`,
            body: updateRequestBody,
            auth: auth,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {

    // Assertion to Validate the response status code
    expect(response.status).to.eq(200);

    // Assertion to Validate the response body contains updated booking details
            expect(response.body).to.have.property('firstname', 'Ndam');
            expect(response.body).to.have.property('lastname', 'Roland');
            expect(response.body).to.have.property('totalprice', 846);
            expect(response.body).to.have.property('depositpaid', true);
            expect(response.body.bookingdates).to.have.property('checkin', '2024-09-05');
            expect(response.body.bookingdates).to.have.property('checkout', '2024-09-10'); // Updated date check
            expect(response.body).to.have.property('additionalneeds', 'Dinner'); // Updated additional needs check
        });
    });

    // Test to delete the booking created above
    it(' Should delete the booking successfully - Test04 ', () => {

        // Ensure that the booking ID is defined
        expect(bookingId).to.not.be.undefined;

        // Authentication for delete (using Basic Auth or API token as per API documentation)
        const auth = {
            username: 'admin', // Example credentials, replace with actual if needed
            password: 'password123'
        };

        // Make a DELETE request to delete the booking
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/booking/${bookingId}`,
            auth: auth,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {

    // Assertion to Validate the response status code
       expect(response.status).to.eq(201);

    // Try to retrieve the deleted booking to ensure it no longer exists
    cy.request({
                method: 'GET',
                url: `${baseUrl}/booking/${bookingId}`,
                failOnStatusCode: false // Do not fail the test if status code is not 2xx
            }).then((getResponse) => {
    // Assertion to Validate that the booking no longer exists (should return 404)
    expect(getResponse.status).to.eq(404);
            });
        });
    });

});
