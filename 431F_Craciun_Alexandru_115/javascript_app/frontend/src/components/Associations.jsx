import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import axios from "axios";

function Associations() {
  const [associations, setAssociations] = useState([]);
  const [plants, setPlants] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const [newAssociation, setNewAssociation] = useState({
    plant_id: "",
    characteristic_id: "",
    note: "",
  });

  useEffect(() => {
    // Fetch associations
    axios.get("http://localhost:5000/api/associations").then((response) => {
      setAssociations(response.data);
    });

    // Fetch plants
    axios.get("http://localhost:5000/api/plants").then((response) => {
      setPlants(response.data);
    });

    // Fetch characteristics
    axios.get("http://localhost:5000/api/characteristics").then((response) => {
      setCharacteristics(response.data);
    });
  }, []);

  const handleAddAssociation = () => {
    if (!newAssociation.plant_id || !newAssociation.characteristic_id) {
      alert("Please select a plant ID and a characteristic ID.");
      return;
    }
    axios
      .post("http://localhost:5000/api/associations", newAssociation)
      .then(() => {
        alert("Association added successfully!");
        window.location.reload();
      });
  };

  const handleDeleteAssociation = (plant_id, characteristic_id) => {
    console.log("Deleting association with:", { plant_id, characteristic_id });

    if (!plant_id || !characteristic_id) {
      alert("Invalid association IDs provided.");
      return;
    }

    axios
      .delete(
        `http://localhost:5000/api/associations/${plant_id}/${characteristic_id}`
      )
      .then(() => {
        alert("Association deleted successfully!");
        // Reload associations after deletion
        setAssociations((prev) =>
          prev.filter(
            (association) =>
              !(
                association.plant_id === plant_id &&
                association.characteristic_id === characteristic_id
              )
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting association:", error);
        alert("Failed to delete association. Please try again.");
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Associations</h1>

      {/* Associations Table */}
      <h2 className="text-xl mb-4">Existing Associations</h2>
      <Table className="w-full border border-gray-200 rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Plant</TableHead>
            <TableHead>Characteristic</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {associations.map((association, index) => (
            <TableRow
              key={
                association.plant_id && association.characteristic_id
                  ? `${association.plant_id}-${association.characteristic_id}`
                  : index
              }
            >
              <TableCell>{association.plantName || "Unknown Plant"}</TableCell>
              <TableCell>
                {association.characteristicName || "Unknown Characteristic"}
              </TableCell>
              <TableCell>{association.note || "No Note"}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() =>
                    handleDeleteAssociation(
                      association.plant_id,
                      association.characteristic_id
                    )
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Plants and Characteristics Tables */}
      <div className="grid grid-cols-2 gap-8 mt-16">
        {/* Plants Table */}
        <div>
          <h2 className="text-xl font-bold mb-4">Plants</h2>
          <Table className="w-full border border-gray-200 rounded">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plants.map((plant) => (
                <TableRow key={plant.id}>
                  <TableCell>{plant.id}</TableCell>
                  <TableCell>{plant.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Characteristics Table */}
        <div>
          <h2 className="text-xl font-bold mb-4">Characteristics</h2>
          <Table className="w-full border border-gray-200 rounded">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {characteristics.map((characteristic) => (
                <TableRow key={characteristic.id}>
                  <TableCell>{characteristic.id}</TableCell>
                  <TableCell>{characteristic.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Association Section */}
      <h2 className="text-2xl font-bold text-center mt-32 mb-8">
        Add New Association
      </h2>
      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <Input
          placeholder="Plant ID"
          type="number"
          onChange={(e) =>
            setNewAssociation({ ...newAssociation, plant_id: e.target.value })
          }
        />
        <Input
          placeholder="Characteristic ID"
          type="number"
          onChange={(e) =>
            setNewAssociation({
              ...newAssociation,
              characteristic_id: e.target.value,
            })
          }
        />
        <Input
          placeholder="Note (optional)"
          onChange={(e) =>
            setNewAssociation({ ...newAssociation, note: e.target.value })
          }
        />
        <Button
          onClick={handleAddAssociation}
          className="bg-green-800 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg mb-32"
        >
          Add Association
        </Button>
      </div>
    </div>
  );
}

export default Associations;
