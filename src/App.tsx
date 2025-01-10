import React, { useState } from "react";
import KanbanBoard from "./components/KanbanBoard";
import Header from "./components/Header";
import AppLayout from "./components/AppLayout";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppLayout>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <KanbanBoard
        searchQuery={searchQuery}
        clearSearch={() => setSearchQuery("")}
      />
    </AppLayout>
  );
};

export default App;
