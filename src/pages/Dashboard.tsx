import { useState } from "react";
import { Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { sampleCollections } from "@/data/sampleData";
import CollectionCard from "@/components/CollectionCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [collections] = useState(sampleCollections);
  const [exchangeRate] = useState(7.75);

  const formatCurrency = (usd: number) => {
    const gtq = usd * exchangeRate;
    return {
      gtq: gtq.toFixed(2),
      usd: usd.toFixed(2),
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-pokemon bg-clip-text text-transparent">
            PokéCollection
          </h1>
          <div className="flex items-center gap-3">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Collection
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {collections.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="text-center space-y-4 max-w-md">
              <h2 className="text-3xl font-bold text-foreground">No Collections Yet</h2>
              <p className="text-muted-foreground">
                Start building your Pokémon card collection by creating your first collection.
              </p>
              <Button className="gap-2 mt-4">
                <Plus className="h-4 w-4" />
                Create Your First Collection
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">My Collections</h2>
              <p className="text-muted-foreground">
                {collections.length} {collections.length === 1 ? "Collection" : "Collections"}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((collection, index) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  exchangeRate={exchangeRate}
                  formatCurrency={formatCurrency}
                  onClick={() => navigate(`/collection/${collection.id}`)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-slide-up"
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
