import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PendoSDK, NavigationLibraryType, WithPendoReactNavigation } from "rn-pendo-sdk";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProjectScreen } from "./src/screens/ProjectScreen";

export type RootStackParamList = {
  Home: undefined;
  Project: { projectId: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

PendoSDK.setup("11beff7e-28ce-4257-8024-4de2ac505395", {
  library: NavigationLibraryType.ReactNavigation,
});

const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);

export default function App() {
  useEffect(() => {
    PendoSDK.startSession(null, null, {}, {});
  }, []);

  return (
    <PendoNavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Taskly" }} />
        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </PendoNavigationContainer>
  );
}
