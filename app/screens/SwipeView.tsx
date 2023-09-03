import { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

interface Card {
  title: string;
}

const CARDS: Card[] = [
  { title: "DO" },
  { title: "MORE" },
  { title: "OF" },
  { title: "WHAT MAKES YOU HAPPY" },
];

const OTHER: Card[] = [
  { title: "do" },
  { title: "more" },
  { title: "of" },
  { title: "what makes you happy" },
];

export default function SwipeView() {
  const swiperRef = useRef<Swiper<Card>>(null);
  const [cards, setCards] = useState<Card[]>(CARDS);

  const fetchData = async () => {
    const newData = OTHER;
    setCards([...cards, ...newData]);
  };

  const onSwipedLeft = (cardIndex: number) => {
    // Call swipe left on api
    if (cardIndex === cards.length - 2) {
      setCards([...cards, ...OTHER]);
    }
    console.log("Left " + cardIndex);
  };

  const onSwipedRight = (cardIndex: number) => {
    // Call swipe right on api
    if (cardIndex === cards.length - 2) {
      setCards([...cards, ...OTHER]);
    }
    console.log("Right " + cardIndex);
  };

  const onSwipedAll = () => {
    // Fetch new cards and set them
    // setCards([...cards, ...OTHER]);
    console.log("onSwipedAll");
  };

  const onRenderCard = (card: Card) => {
    return (
      <View style={styles.card}>
        <Text style={styles.text}>{card.title}</Text>
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
          backgroundColor="#FFFFFF"
          overlayLabelWrapperStyle={styles.overlayLabelStyle}
          animateOverlayLabelsOpacity
          animateCardOpacity
          renderCard={onRenderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          onSwipedAll={onSwipedAll}
        />
      </View>
    </SafeAreaView>
  );
}

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

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
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
