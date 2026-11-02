import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationLibraryType, PendoSDK, WithPendoReactNavigation } from "rn-pendo-sdk";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ProjectScreen } from "./src/screens/ProjectScreen";

PendoSDK.setup(
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhY2VudGVyIjoidXMiLCJrZXkiOiI1YzVkYTkzYTljMzllYzcyZTdkYzc3MjAzNjg3NWJhZTZlMjY1MmI1NDBlYTYwZmNhMzc4MTk3ODc4NDdlYjAwYTJkMzgyOGJhZDQ4MDNjYzI5ZWRjNWM3YmMxY2YxNWQ3YWVmMDc5MWU1YTQ3MDlhNjVhNGYwNDQ2MzdiZDFjYmUzMWE5NWY2OGZkMGI2ZDg5ZGU1OTk3ODJhNWI4Nzk4NWNhNjA5MTg1MDIwZjI4ZGEwZDNjZGE1MTAxNmUwNzUuZjE5OWEzYThjMDZmNmZhZWY0ZTMzNzM1YWRmZjkxZTguMzE1NjM2MmJmZmQxZTk3NzNmY2RlMTZkZDhkNzcwNThhNzBmNWMzMWM3MjYyNWZkYjM2OTYxYzJhNDhjYjIwOSJ9.b2wd0OsBnl7HNdKN2s-9G7y_vB1FmyFw75g-tICAvPF3N_6vxN9VdEihcUYoc8_MXFqSELARJ6iSOzIRespU0A5o5caaEwLYmHt30lBNoVo__kVvwsOyJ4umV12X5y4ZevPxjDmUUICd0s5E6SJI38uj26HpBGQYD2AfaLd4A-c",
  { library: NavigationLibraryType.ReactNavigation },
);

// Taskly has no sign-in flow or user identity yet, so start an anonymous
// visitor session. Move this call to the post-login handler (passing the
// signed-in user's id and metadata) once authentication exists.
PendoSDK.startSession("", "", {}, {});

const PendoNavigationContainer = WithPendoReactNavigation(NavigationContainer);

export type RootStackParamList = {
  Home: undefined;
  Project: { projectId: string; name: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
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
