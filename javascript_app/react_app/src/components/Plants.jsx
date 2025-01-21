import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import axios from "axios";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [newPlant, setNewPlant] = useState({
    name: "",
    scientific_name: "",
    description: "",
    origin: "",
    type: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/plants").then((response) => {
      setPlants(response.data);
    });
  }, []);

  const handleAddPlant = () => {
    if (!newPlant.type) {
      alert("Please select a plant type.");
      return;
    }
    axios.post("http://localhost:5000/api/plants", newPlant).then(() => {
      alert("Plant added successfully!");
      window.location.reload();
    });
  };

  const handleDeletePlant = (id) => {
    axios.delete(`http://localhost:5000/api/plants/${id}`).then(() => {
      alert("Plant deleted successfully!");
      window.location.reload();
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Plants</h1>

      {/* Plants Table */}
      <h2 className="text-xl mb-4">Existing Plants</h2>
      <Table className="w-full border border-gray-200 rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant) => (
            <TableRow key={plant.id}>
              <TableCell>{plant.name}</TableCell>
              <TableCell>{plant.description}</TableCell>
              <TableCell>{plant.origin}</TableCell>
              <TableCell>{plant.type}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePlant(plant.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Plant Form */}
      <h2 className="text-2xl font-bold text-center mt-32 mb-8">
        Add New Plant
      </h2>
      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <Input
          placeholder="Name"
          onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
        />
        <Input
          placeholder="Scientific Name"
          onChange={(e) =>
            setNewPlant({ ...newPlant, scientific_name: e.target.value })
          }
        />
        <Textarea
          placeholder="Description"
          onChange={(e) =>
            setNewPlant({ ...newPlant, description: e.target.value })
          }
        />
        <Input
          placeholder="Origin"
          onChange={(e) => setNewPlant({ ...newPlant, origin: e.target.value })}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">{newPlant.type || "Select Plant Type"}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["Flower", "Tree", "Shrub", "Herb", "Cactus", "Other"].map(
              (type) => (
                <DropdownMenuItem
                  key={type}
                  onClick={() => setNewPlant({ ...newPlant, type })}
                >
                  {type}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button onClick={handleAddPlant} className="bg-green-800 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg mb-32">Add Plant</Button>
      </div>
    </div>
  );
}

export default Plants;
