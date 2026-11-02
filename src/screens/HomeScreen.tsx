import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

interface Project {
  id: string;
  name: string;
  taskCount: number;
}

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    void fetch("https://api.taskly.test/api/projects")
      .then((response) => response.json())
      .then(setProjects);
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={projects}
        keyExtractor={(project) => project.id}
        renderItem={({ item }) => (
          <Pressable
            testID={`project-row-${item.id}`}
            onPress={() => navigation.navigate("Project", { projectId: item.id, name: item.name })}
          >
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>{item.taskCount} tasks</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
