import { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

interface Task {
  id: string;
  title: string;
  done: boolean;
}

type Props = NativeStackScreenProps<RootStackParamList, "Project">;

export function ProjectScreen({ route }: Props) {
  const { projectId } = route.params;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    void fetch(`https://api.taskly.test/api/projects/${projectId}`)
      .then((response) => response.json())
      .then((project: { tasks: Task[] }) => setTasks(project.tasks));
  }, [projectId]);

  const addTask = async () => {
    const response = await fetch(`https://api.taskly.test/api/projects/${projectId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const task = (await response.json()) as Task;
    setTasks([...tasks, task]);
    setTitle("");
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        testID="task-title-input"
        value={title}
        onChangeText={setTitle}
        placeholder="New task"
      />
      <Button testID="add-task-button" title="Add task" onPress={() => void addTask()} />
      <FlatList
        data={tasks}
        keyExtractor={(task) => task.id}
        renderItem={({ item }) => <Text>{item.done ? `✓ ${item.title}` : item.title}</Text>}
      />
    </View>
  );
}
