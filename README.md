# How to start the project

First thing first make sure you have postgres running on your device, I used brew to install postgresql@17 just to keep up with the new version for this micro service.

Once done hop to the project's directory by typing `cd path/to/the/propject`
Now you need to launch the `yarn` command to download all the packages needed to kick the software.

Next you'll need to create the DB schema, it's already defined (I've done it for you) so you just need to run `yarn generate` and `yarn migrate` to ensure the table creation in your local DB

You're almost there, you need now to import a given .csv file as a sample of database given as an example. Run `yarn import-data` to make the magic happen but first check the `scr/data` folder to check if there is an actual file with a .csv extention

Now you're done! Hit `yarn start` and the system will start synching with the remote services and will be importing next transactions in your local db every 10s. It will also show you the `block_number` of a block received with the number of transactions in it on console.

During this little project I had to cover some new things and face a slight issues with `BigInt` data type to find out there's an issue currently opened on git `https://github.com/prisma/prisma/issues/21049` this got me upset for sometime.

## quick endpoint syntax

3 endpoins implemented have the following syntax:

`localhost:3000/transactions/count` where the body is `{
    "address":"0xTEST"
}`

`localhost:3000/transactions?page=1&limit=10` where the body is `{
    "address":"0xTEST"
}`

`localhost:3000/transactions/list?page=1&limit=10` where the body is -You , you my buddy

## .env file structure

`DATABASE_NAME="routescan-db"`
`USER="usr"`
`PASSWORD="pwd"`
`DATABASE_URL="postgresql://usr:pwd@localhost:5432/routescan-db?schema=public"`
`PORT=3000`

I trully hope the result is somewhat you expected as I gotta be honest I've never worked with this kind of technologies yet, though I would really like to see how fast it can grow and contribute to the business and the tech evolution

Made w ❤️ by pluggedinlife
