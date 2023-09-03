import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import Unorderedlist from "react-native-unordered-list";
import React from "react";

interface SwipeViewProps {
  mode: "profile" | "application";
}

interface ApplicationCard {
  title: string;
  location: string;
  job_type: string;
  experience_level: string;
  skills: string[];
  description: string;
}

const CARDS: ApplicationCard[] = [
  {
    title: "Software Engineer",
    location: "remote",
    job_type: "Full-time",
    experience_level: "Senior",
    skills: ["gela", "musha"],
    description: "aaaaaaa",
  },
  {
    title: "Bartender",
    location: "On-site",
    job_type: "Full-time",
    experience_level: "Senior",
    skills: ["gela", "musha"],
    description: "aaaaaaa",
  },
  {
    title: "DO",
    location: "remote",
    job_type: "Full-time",
    experience_level: "Senior",
    skills: ["gela", "musha"],
    description: "aaaaaaa",
  },
  {
    title: "DO",
    location: "remote",
    job_type: "Full-time",
    experience_level: "Senior",
    skills: ["gela", "musha"],
    description: "aaaaaaa",
  },
];

export default function SwipeView({ mode }: SwipeViewProps) {
  const swiperRef = useRef<Swiper<ApplicationCard>>(null);
  const [cards, setCards] = useState<ApplicationCard[]>(CARDS);

  const fetchData = async () => {
    // const newData = OTHER;
    // setCards([...cards, ...newData]);
  };

  const onSwipedLeft = (cardIndex: number) => {
    // Call swipe left on api
    // if (cardIndex === cards.length - 2) {
    //   setCards([...cards, ...OTHER]);
    // }
    console.log("Left " + cardIndex);
  };

  const onSwipedRight = (cardIndex: number) => {
    // Call swipe right on api
    // if (cardIndex === cards.length - 2) {
    //   setCards([...cards, ...OTHER]);
    // }
    console.log("Right " + cardIndex);
  };

  const onRenderCard = (card: ApplicationCard) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Experience level:</Text>
          <Text style={styles.cardLabelSmall}>{card.experience_level}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Job location:</Text>
          <Text style={styles.cardLabelSmall}>{card.location}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Job type:</Text>
          <Text style={styles.cardLabelSmall}>{card.job_type}</Text>
        </View>

        <Text style={styles.cardLabel}>Skills:</Text>
        <View>
          {card.skills.map((skill) => (
            <View key={skill} style={{ padding: 5 }}>
              <Unorderedlist bulletUnicode={0x2023}>
                <Text style={{ fontSize: 15 }}>{skill}</Text>
              </Unorderedlist>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.cardLabel}>Description:</Text>
          <Text style={styles.cardLabelSmall}>{card.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ display: "flex", flexDirection: "column" }}>
      <View
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Swiper
          ref={swiperRef}
          cards={cards}
          cardIndex={0}
          verticalSwipe={false}
          overlayLabels={overlayLabels}
          stackSize={3}
          infinite // TODO: remove infinite later
          backgroundColor="#FFFFFF"
          overlayLabelWrapperStyle={styles.overlayLabelStyle}
          animateOverlayLabelsOpacity
          animateCardOpacity
          renderCard={onRenderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    flex: 1,
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "transparent",
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  cardLabel: {
    padding: 8,
    fontSize: 20,
    color: "grey",
    fontWeight: "bold",
    alignSelf: "baseline",
  },
  cardLabelSmall: {
    fontSize: 15,
    padding: 8,
    alignSelf: "baseline",
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
  },
  overlayLabelStyle: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 2,
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

const overlayLabels = {
  left: {
    element: <Text>NOPE</Text>,
    title: "NOPE",
    style: {
      label: {
        backgroundColor: "black",
        borderColor: "black",
        color: "white",
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        marginTop: 30,
        marginLeft: -30,
      },
    },
  },
  right: {
    element: <Text>LIKE</Text>,
    title: "LIKE",
    style: {
      label: {
        backgroundColor: "black",
        borderColor: "black",
        color: "white",
        borderWidth: 1,
      },
      wrapper: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: 30,
        marginLeft: 30,
      },
    },
  },
};
