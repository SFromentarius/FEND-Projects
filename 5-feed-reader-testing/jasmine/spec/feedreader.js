/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This test make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* The test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('URLs are defined and not empty', function () {
            allFeeds.forEach(function (item) {
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toEqual(0);
            })
        });

        /* The test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined and not empty', function () {
            allFeeds.forEach(function (item) {
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toEqual(0);
            })
        });
    });


    describe('The menu', function () {
        var body = document.body;
        var menuIcon = $('.menu-icon-link');
        /* The test  ensures the menu element is
         * hidden by default.
         */
        it('menu element is hidden by default', function () {
            expect(body.className).toContain('menu-hidden');
        });
        /* The test  ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility when the menu icon is clicked', function () {
            menuIcon.click();
            expect(body.className).not.toContain('menu-hidden');
            menuIcon.click();
            expect(body.className).toContain('menu-hidden');
        });
    });


    describe('Initial Entries', function () {
        var container = $('.feed');
        /* The test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * LoadFeed() is asynchronous so this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0);
            done();
        });

        it('at least a single .entry element within the .feed container', function (done) {
            expect($('.feed .entry')).not.toBeNull();
            done();
        });
    });


    describe('New Feed Selection', function () {
        /* The test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * LoadFeed() is asynchronous.
         */
        var feedBefore;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feedBefore = document.querySelector('.feed').innerHTML;
                loadFeed(1, function () {
                    done();
                });
            });


        });

        it('when a new feed is loaded, the content changes', function (done) {
            var feedAfter = document.querySelector('.feed').innerHTML;
            expect(feedBefore).not.toBe(feedAfter);
            done();
        });
    });
});
