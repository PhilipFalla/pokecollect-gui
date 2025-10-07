import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sampleCollections } from "@/data/sampleData";
import CardListItem from "@/components/CardListItem";

const CollectionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exchangeRate, setExchangeRate] = useState(7.75);

  const collection = sampleCollections.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Collection Not Found</h2>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (usd: number) => {
    const gtq = usd * exchangeRate;
    return {
      gtq: gtq.toFixed(2),
      usd: usd.toFixed(2),
    };
  };

  const totalValue = collection.cards.reduce((sum, card) => sum + card.valueUSD, 0);
  const { gtq, usd } = formatCurrency(totalValue);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Collections
            </Button>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Exchange Rate:</label>
              <Select
                value={exchangeRate.toString()}
                onValueChange={(value) => setExchangeRate(parseFloat(value))}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 11 }, (_, i) => (7.0 + i * 0.1).toFixed(1)).map(
                    (rate) => (
                      <SelectItem key={rate} value={rate}>
                        {rate}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-gradient-card rounded-lg p-6 shadow-card mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Collection Value</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">Q{gtq}</span>
                <span className="text-lg text-muted-foreground italic">${usd} USD</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Layers className="h-4 w-4" />
                Number of Cards
              </p>
              <p className="text-3xl font-bold">{collection.cards.length}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Last Updated
              </p>
              <p className="text-xl font-semibold">{collection.lastUpdated}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Cards in Collection</h2>
          <div className="space-y-3">
            {collection.cards.map((card, index) => (
              <CardListItem
                key={card.id}
                card={card}
                formatCurrency={formatCurrency}
                style={{ animationDelay: `${index * 0.05}s` }}
                className="animate-slide-up"
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectionDetail;
