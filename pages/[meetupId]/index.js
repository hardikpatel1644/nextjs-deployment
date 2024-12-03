import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name='description' content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://hackdev16:b4QppEe9zgrx9mf5@cluster0.6gj7l.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(content) {
  const meetupId = content.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://hackdev16:b4QppEe9zgrx9mf5@cluster0.6gj7l.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0"
  );

  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });
  client.close();

  console.log("meetupId", meetupId);
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    },
  };
}
export default MeetupDetails;
