import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";
import Unorderedlist from "react-native-unordered-list";
import React from "react";
import { get, post } from "../axios";
import { BASE_URL } from "../Constants";
import { useIsFocused } from "@react-navigation/native";

interface SwipeViewProps {
  mode: "profile" | "application";
  application_id?: number;
}

class Card {}

interface ApplicationCard extends Card {
  title: string;
  location: string;
  job_type: string;
  experience_level: string;
  skills: string[];
  description: string;
}

interface NameDescription {
  name: string;
  description: string;
}

interface UserProfile extends Card {
  username: string;
  skills: NameDescription[];
  educations: NameDescription[];
  experience: NameDescription[];
}

const STACK_SIZE = 10;

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

const PROFILES: UserProfile[] = [
  {
    username: "gela",
    educations: [
      {
        name: "freeuni",
        description: "bachelor MACS",
      },
      {
        name: "154 school",
        description: "school ",
      },
    ],
    skills: [
      {
        name: "cooking",
        description: "css",
      },
      {
        name: "baking",
        description: "html",
      },
    ],
    experience: [
      {
        name: "lambda gaming",
        description: "cudi",
      },
    ],
  },
  {
    username: "levani",
    educations: [
      {
        name: "freeuni",
        description: "bachelor MACS",
      },
      {
        name: "154 school",
        description: "school ",
      },
    ],
    skills: [],
    experience: [],
  },
];

export default function SwipeView({ mode, application_id }: SwipeViewProps) {
  const isFocused = useIsFocused();
  const swiperRef = useRef<Swiper<Card>>(null);
  const [cards, setCards] = useState<Card[]>([]);

  const fetchData = async () => {
    console.log("FETCHING DATA");

    if (mode === "application") {
      get(`${BASE_URL}/swipe/list/applications`, {
        params: {
          amount: STACK_SIZE,
        },
      })
        .then((res) => {
          const swipe_list: any[] = res.data.swipe_list;
          const newData = swipe_list.map((val) => {
            const appCard: ApplicationCard = {
              title: val.title,
              description: val.description,
              experience_level: val.experience_level,
              job_type: val.job_type,
              location: val.location,
              skills: val.skills,
            };

            return appCard;
          });

          setCards([...cards, ...newData]);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (mode === "profile" && application_id) {
      get(`${BASE_URL}/swipe/list/users`, {
        params: {
          amount: STACK_SIZE,
          swiper_application_id: application_id,
        },
      })
        .then((res) => {
          console.log(res.data.swipe_list);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    // const newData = OTHER;
    // setCards([...cards, ...newData]);
  };

  useEffect(() => {
    fetchData();
  }, [isFocused]);

  const onSwipedLeft = (cardIndex: number) => {
    // Call swipe left on api
    if (mode === "application") {
    }

    if (cardIndex === cards.length - 2) {
      fetchData();
    }
  };

  const onSwipedRight = (cardIndex: number) => {
    // Call swipe right on api
    if (cardIndex === cards.length - 2) {
      fetchData();
    }
  };

  const onRenderApplicationCard = (card: ApplicationCard) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{card.title}</Text>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Experience Level:</Text>
          <Text style={styles.cardLabelSmall}>{card.experience_level}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Job Location:</Text>
          <Text style={styles.cardLabelSmall}>{card.location}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardLabel}>Job Type:</Text>
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

  const onRenderUserProfile = (card: UserProfile) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{card.username}</Text>

        <Text style={styles.cardLabel}>Skills:</Text>
        <View>
          {card.skills.map((skill) => (
            <View key={skill.name} style={{ padding: 5 }}>
              <Unorderedlist bulletUnicode={0x2023}>
                <Text style={{ fontSize: 15 }}>{skill.description}</Text>
              </Unorderedlist>
            </View>
          ))}
        </View>

        <Text style={styles.cardLabel}>Educations:</Text>
        <View>
          {card.educations.map((education) => (
            <View key={education.name} style={{ padding: 5 }}>
              <Unorderedlist bulletUnicode={0x2023}>
                <Text style={{ fontSize: 15 }}>{education.description}</Text>
              </Unorderedlist>
            </View>
          ))}
        </View>

        <Text style={styles.cardLabel}>Experience:</Text>
        <View>
          {card.experience.map((exp) => (
            <View key={exp.name} style={{ padding: 5 }}>
              <Unorderedlist bulletUnicode={0x2023}>
                <Text style={{ fontSize: 15 }}>{exp.description}</Text>
              </Unorderedlist>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const onRenderCard = (c: Card) => {
    if (!c) {
      return <></>;
    }

    let card;

    if ("job_type" in c) {
      card = c as ApplicationCard;
      return onRenderApplicationCard(card);
    } else {
      card = c as UserProfile;
      return onRenderUserProfile(card);
    }
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
          stackSize={3}
          backgroundColor="#FFFFFF"
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
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    alignContent: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  cardTitle: {
    textAlign: "center",
    justifyContent: "flex-start",
    fontSize: 40,
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  cardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  cardLabel: {
    padding: 12,
    fontSize: 20,
    color: "grey",
    fontWeight: "bold",
    alignSelf: "baseline",
  },
  cardLabelSmall: {
    fontSize: 15,
    padding: 12,
    alignSelf: "baseline",
  },
});
