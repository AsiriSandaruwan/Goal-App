import { StyleSheet, View, FlatList, Button, StatusBar } from "react-native";
import React, { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
export default function App() {
  const [courseGoal, setCourseGoal] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const startAddGoalHandler = () => {
    setModalVisible(true);
  };

  const endAddGoalHandler = () => {
    setModalVisible(false);
  };
  const addGoalHandler = (enteredGoalText) => {
    setCourseGoal((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoal((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.key !== id);
    });
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#b170f0"}
          onPress={startAddGoalHandler}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalVisible}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoal}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteGoalHandler}
                  id={itemData.item.key}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: "#1e085a",
  },
  goalContainer: {
    flex: 3,
  },
});
