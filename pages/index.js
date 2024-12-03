import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";
function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='React Meetups desc'></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://hackdev16:b4QppEe9zgrx9mf5@cluster0.6gj7l.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

/*
export async function getServerSideProps(content) {
  const req = content.req;
  const res = content.res;
  return {
    props: {
      meetups: DUMMY_MEETUP,
    },
  };
}
  */

export default HomePage;
