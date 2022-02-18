// Getting required file for the program to run

const puppeteer = require("puppeteer");
const useProxy = require("puppeteer-page-proxy");

var runFor = false;
let loopCount;

const TIMEOUT = 15000;
const fs = require("fs");
// const C = require('../config.json');

//  Username and password Selector
const USERNAME_SELECTOR = "#email";
const PASSWORD_SELECTOR = "#pass";
const CTA_SELECTOR = 'button[type="submit"]';
var postCount, membersCount, timeSpan;

// Starting the Browser
startBrowser = async () => {
    const browser = await puppeteer.launch({
        headless: false, // true by default. False means we can not see the browser
        // args: ['--proxy-server=114.79.146.137:8080']
        // args: ['--proxy-server=139.5.29.97:39241']
    });
    const page = await browser.newPage();
    // await useProxy(page, 'http://125.16.111.194:8080');

    // Authenticate Proxy IP
    await page.authenticate({
        username: "Selkaustavghosh",
        password: "G4q3TcW",
    });

    return { browser, page };
};
// Will close the Browser once the task completed.
closeBrowser = async (browser) => browser.close();

playTest = async (url, searchString, postGroup, username, password) => {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });

    await page.goto(url);
    console.log("Go to URL");




    await page.click(USERNAME_SELECTOR); // click username selector
    await page.waitForTimeout(4000);

    await page.keyboard.type(username); // Type the user name in the user input field
    await page.waitForTimeout(4000);

    await page.click(PASSWORD_SELECTOR); // click password selector
    await page.waitForTimeout(2000);

    await page.keyboard.type(password); // Type the password in the user input field
    await page.waitForTimeout(3000);



    await page.keyboard.press("Enter"); // Hit enter for login


    await page.waitForTimeout(TIMEOUT + 10000);
    console.log("Logged IN");
    console.log("Please wait while all content get Loading..............");

    await page.waitForTimeout(TIMEOUT);


    // // await page.click('[title="Accept All"]');
    // console.log("Logged In Button Clicked");

    // Waiting for groups tab selector 
    await page.waitForSelector('[href="/groups/"]');
    // Click on the GROUP tab
    await page.waitForTimeout(TIMEOUT);

    await page.click("[href='/groups/']");
    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(TIMEOUT);



    // await page.waitForSelector('[placeholder="Search groups"]');
    await page.click('[placeholder="Search groups"]'); //   Click on Search box input 

    await page.keyboard.type(searchString); // Type search string

    console.log("Search String Entered");

    await page.keyboard.press("Enter"); // Hit enter
    await page.waitForTimeout(TIMEOUT);


    // await page.waitForSelector(`[aria-label="See All"]`);
    //  Click on see all button after the search
    await page.click(`[aria-label="See all"]`);
    await page.waitForTimeout(TIMEOUT);
    console.log("See All Clicked");
    let count = await page.$$('[role="article"] [role="link"] span');

    loopCount = count.length - 1;
    await page.waitForTimeout(5000);
    // await page.waitForSelector('input [role="switch"]');
    await page.waitForTimeout(5000);
    let publicSelector = "input[type='checkbox']";
    await page.click(publicSelector);
    await page.waitForTimeout(5000);
    console.log("Filtered");






    console.log("Total Loop Count : ", loopCount);

    for (let index = 0; index < loopCount; index++) {

        await page.waitForTimeout(TIMEOUT + 15000);

        if (index % 4 == 0 && index > 3) {
            await page.evaluate(() => {
                window.scrollBy(0, 100);
            });
        }
        let GoInside = await page.$$('[role="article"] [role="link"] span');

        console.log("Current Loop Count : ", index);
        console.log("Current Data Count: ", GoInside.length);

        await page.waitForTimeout(10000);


        await GoInside[index].click();

        console.log("Went Inside");
        await page.waitForTimeout(TIMEOUT + 5000);


        // await page.goBack();

        // console.log("Went OutSide : ");


        try {

            await page.waitForSelector('div [aria-label="Join group"]');
            await page.click('div [aria-label="Join group"]')
            console.log("Join Group Button  Available");



        } catch (error) {

            console.log("Join Group Button not Available");
            // console.error(error); // Not Needed Now
            await page.waitForTimeout(10000);

            try {


                await page.waitForSelector('div [aria-label="Invite"]');
                console.log("Invite Button  Available");
                // const [button] = await page.$x("//button[contains(., 'Invite')]");
                // if (button) {
                //     await button.click();
                //     console.log("Invite Button Available");

                // }


            } catch (error) {
                console.log("Invite Button not Available");
                console.error(error);

            }
        }
        try {
            await page.waitForTimeout(6000);

            await page.click('[data-pagelet="GroupInlineComposer"] [role="button"] span');

        } catch {
            console.error(error);

            console.log("Post input Box Not Available");

            await page.goBack();
            continue;
        }
        try {
            let postGroupData = postGroup;
            await page.waitForTimeout(10000);


            await page.keyboard.type(postGroupData);
            console.log("Typing the post text");
            await page.waitForTimeout(5000);

            await page.click('[aria-label="Post"]');

            console.log("Hit Post");
            await page.waitForTimeout(10000);

            await page.goBack();
            await page.waitForTimeout(10000);

            console.log("Went OutSide");


        } catch (error) {
            console.log("Error On Posting ");
            console.error(error);
            await page.waitForTimeout(10000);

            await page.goBack();
            console.log("Went OutSide: ERROR on Post");
            continue;

        }





    }

    // const GoInside = await page.$$('[role="article"] [role="link"] span');










    // for (let index = 0; index < loopCount; index++) {

    //     const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));


    //     await GoInside[index].click();
    //     const newPage = await newPagePromise;

    //     // Try post in Group
    //     try {
    //         console.log("Post Group");
    //         // await page.screenshot({ path: 'glance6.png' });
    //         console.log("Open Post Popup");

    //         // Try search for POST selector
    //         try {
    //             await page.waitForTimeout(6000);

    //             await page.click(
    //                 '[data-pagelet="GroupInlineComposer"] [role="button"] span'
    //             );

    //             // Does exist go back
    //         } catch {
    //             // Does not
    //             await page.goBack();
    //         }


    //         //  Error in below code need to fix (muthuDivum)
    //         await page.waitForTimeout(TIMEOUT);

    //         // await page.screenshot({ path: 'glance7.png' });

    //         // await page.click('[id="placeholder-6hpma"]');
    //         await page.keyboard.type(postGroup);
    //         console.log("Typing the post text");
    //         await page.waitForTimeout(5000);

    //         await page.click('[aria-label="Post"]');

    //         console.log("Hit Post");

    //         await page.waitForTimeout(TIMEOUT);

    //         console.log("\\n");
    //         await page.waitForTimeout(TIMEOUT);

    //         await newPage.close();

    //         await page.waitForNavigation();
    //     }
    //     // Catching Error if post fails
    //     catch (err) {
    //         console.log("Error On Posting ");
    //         console.log(err); // TypeError: failed to fetch
    //     }

    // }




    //We are not using Now
    async function getDetails() {
        //  Get the Group Name only and Store that to an array
        const GroupName = await page.evaluate(() =>
            Array.from(
                document.querySelectorAll('[role="article"] [role="link"] span'),
                (element) => element.textContent
            )
        );
        // Get the Group details 
        const groupDetails = await page.evaluate(() =>
            Array.from(
                document.querySelectorAll('[role="article"] '),
                (element) => element.textContent
            )
        );
    }




















    if (false) {

        // Try the Post groups for 5 Times
        for (let index = 0; index < 7; index++) {

            let nameOfGroup = uniqueGroupName[index]; // Get a group name to search
            await page.waitForSelector('[href="/groups/"]');


            await page.click("[href='/groups/']"); // Going to group tab
            // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForTimeout(TIMEOUT);

            console.log("Group Tab");

            // await page.screenshot({ path: 'glance1.png' });

            // await page.waitForSelector('[placeholder="Search groups"]');

            await page.click('[placeholder="Search groups"]'); //Click on search group input field

            await page.keyboard.type(nameOfGroup); // Type the group name to search for

            console.log("Search String Entered");
            // await page.screenshot({ path: 'glance2.png' });

            await page.keyboard.press("Enter"); //Press enter
            await page.waitForTimeout(TIMEOUT);


            await page.click('[role="article"] [role="button"]'); // Click on join button
            await page.waitForTimeout(TIMEOUT);

            await page.click('[role="article"] [role="link"] span'); // go inside the Group

            // Try post in Group
            try {
                console.log("Post Group");
                // await page.screenshot({ path: 'glance6.png' });
                console.log("Open Post Popup");

                // Try search for POST selector
                try {
                    await page.waitForTimeout(6000);

                    await page.click(
                        '[data-pagelet="GroupInlineComposer"] [role="button"] span'
                    );

                    // Does exist go back
                } catch {
                    // Does not
                    await page.goBack();
                }
                //  Error in below code need to fix (muthuDivum)
                await page.waitForTimeout(TIMEOUT);

                // await page.screenshot({ path: 'glance7.png' });

                // await page.click('[id="placeholder-6hpma"]');
                await page.keyboard.type(postGroup);
                console.log("Typing the post text");
                await page.waitForTimeout(5000);

                await page.click('[aria-label="Post"]');

                console.log("Hit Post");

                await page.waitForTimeout(TIMEOUT);

                console.log("\\n");
                await page.waitForTimeout(TIMEOUT);

                await page.goBack();

                await page.waitForNavigation();
            }
            // Catching Error if post fails
            catch (err) {
                console.log("Error On Posting ");
                console.log(err); // TypeError: failed to fetch
            }
        }

    }

    // joinGroup(page);
    // await page.click('[role="article"] [role="button"]');
    await page.waitForTimeout(3000);
    // Trail / Failed Code , Having for reference
    async function someCode() {
        // await page.click('[role="article"] [role="button"]');
        console.log("Join Group Button Clicked, for Unjoined Group");
        // const [firstJoin, secondJoin, thirdJoin] = await page.$$('[role="article"] [role="button"]');
        const [firstOpen, secondOpen, thirdOpen] = await page.$$(
            '[role="article"] [role="link"] span'
        );

        // await firstJoin.click();
        await page.click('[role="article"] [role="button"]');
        await firstOpen.click();
        await page.waitForTimeout(5000);

        await postInGroup(page);

        // await secondJoin.click();
        await page.click('[role="article"] [role="button"]');
        await secondOpen.click();
        await page.waitForTimeout(5000);

        await postInGroup(page);

        await page.click('[role="article"] [role="button"]');
        await thirdOpen.click();
        await page.waitForTimeout(5000);

        await postInGroup(page);

        // await thirdJoin.click();

        // await page.click('[role="article"] [role="button"] ');

        // await page.click('[role="article"] [role="link"] span');

        // await postInGroup(page);
    }

    // let nov = await nov3Code(page);

    // Trail / Failed Code , Having for reference only for Developer
    async function nov3Code(page) {
        console.log("Function Called");

        // await page.waitForTimeout(TIMEOUT + 5000);

        for (let index = 0; index < 5; index++) {
            console.log("index: \t", index);
            const join = await page.$$('[role="article"] [role="button"]');
            const openGroup = await page.$$('[role="article"] [role="link"] span');

            await page.waitForTimeout(TIMEOUT);

            console.log(join, "\n", openGroup);
            if (index % 4 == 0) {
                await page.evaluate(() => {
                    window.scrollBy(0, 50);
                });
            }

            // await join[index].click();
            await page.click(join[index]);

            await page.waitForTimeout(3000);

            // await openGroup[index].click();
            await page.click(openGroup[index]);

            // await page.click('[role="article"] [role="link"] span');

            await postInGroup(page); // Call the post in group function
        }
    }

    // Trail / Failed Code , Having for reference only for Developer

    // Duplicate
    async function newCode() {
        await page.evaluate(async () => {
            let join = $$('[role="article"] [role="button"]').toArray();
            let openGroup = $$('[role="article"] [role="link"] span').toArray();
            for (i = 0; i < /*elements.length*/ 5; i++) {
                console.log(join[i]);
                $(join[i]).click();
                await page.waitForTimeout(10000);

                console.log(openGroup[i]);
                $(openGroup[i]).click();

                await postInGroup(page);
            }
        });
    }

    // Trail / Failed Code , Having for reference only for Developer

    async function oldOne() {
        const join = await page.$$('[role="article"] [role="button"]');
        // console.log(join);

        // await join[2].click();

        // await page.waitForTimeout(TIMEOUT + 5000);
        // await page.screenshot({ path: 'glance5.png' });
        const openGroup = await page.$$('[role="article"] [role="link"] span');

        for (let index = 0; index < 5; index++) {
            // console.log("Waiting for Selector  :   ", index, "\n");

            await page.waitForSelector(join[index]);
            await page.click(join[index]);

            await page.waitForSelector(openGroup[index]);

            await page.click(openGroup[index]);

            // await page.waitForTimeout(3000);
            // await page.click('[role="article"] [role="link"] span');
            await postInGroup(page);
        }

        // await openGroup[2].click();
        // await page.click('[role="article"] [role="link"] span');

        await page.waitForTimeout(TIMEOUT);
        // const Dialog = await page.evaluate(() => Array.from(document.querySelectorAll('[role="dialog"] '), element => element.textContent));
        // console.log(Dialog);

        // await postInGroup(page);
    }

    // regEX(); 
    async function regEX() {
        console.log("regCalled");
        for (let i = 0; i < groupDetails.length; i++) {
            // console.log(i, "= ", groupDetails[i]);

            let str = groupDetails[i];
            let strR = str.replace("members", "members ");
            let strR2 = strR.replace(" · ", "");
            console.log("String:\n", strR2.substring(0, 200));
            console.log("Group Name: ", GroupName[i]);

            postCount = /\w+(?=\s+posts)/.exec(strR2); // For No of Posts
            postCount = postCount[0];
            console.log("Post Count: ", postCount);

            membersCount = /(?<=group\s).*(?=\members)/.exec(strR2); // For No of Members
            membersCount = membersCount[0];
            console.log("Member Count: ", membersCount);

            timeSpan = /(?<=\bposts a\s)(\w+)/.exec(strR2); // For No of Members
            timeSpan = timeSpan[0];
            console.log("Time Span: ", timeSpan);
            console.log("i", i, "\n");
        }
    }

};

runScript = async (searchString, postGroup, username, password) => {
    await playTest(
        "https://www.facebook.com/",
        searchString,
        postGroup,
        username,
        password
    );
    process.exit(1);
};


// Auto Scroll Functionality
autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 1000);
        });
    });
};

async function joinGroup(page) {
    console.log("Join Group Called");
    // await page.click('[role="article"] [role="button"]');
    // await page.waitForTimeout(3000);

    await page.click('[role="article"] [role="button"]');

    await page.waitForTimeout(TIMEOUT);

    // await page.screenshot({ path: 'glance.png' });
}
module.exports = {
    runScript,
};