import { useState, useEffect } from "react";
import { Input } from "./ui/input";
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

function Characteristics() {
  const [characteristics, setCharacteristics] = useState([]);
  const [newCharacteristic, setNewCharacteristic] = useState({
    name: "",
    value: "",
    unit: "",
    importance: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/characteristics").then((response) => {
      setCharacteristics(response.data);
    });
  }, []);

  const handleAddCharacteristic = () => {
    if (!newCharacteristic.importance) {
      alert("Please select an importance level.");
      return;
    }
    axios
      .post("http://localhost:5000/api/characteristics", newCharacteristic)
      .then(() => {
        alert("Characteristic added successfully!");
        window.location.reload();
      });
  };

  const handleDeleteCharacteristic = (id) => {
    axios.delete(`http://localhost:5000/api/characteristics/${id}`).then(() => {
      alert("Characteristic deleted successfully!");
      window.location.reload();
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Characteristics</h1>

      {/* Characteristics Table */}
      <h2 className="text-xl mb-4">Existing Characteristics</h2>
      <Table className="w-full border border-gray-200 rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Importance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {characteristics.map((characteristic) => (
            <TableRow key={characteristic.id}>
              <TableCell>{characteristic.name}</TableCell>
              <TableCell>{characteristic.value}</TableCell>
              <TableCell>{characteristic.unit}</TableCell>
              <TableCell>{characteristic.importance}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteCharacteristic(characteristic.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Characteristic Form */}
      <h2 className="text-2xl font-bold text-center mt-32 mb-8">
        Add New Characteristic
      </h2>
      <div className="flex flex-col items-center gap-4 max-w-lg mx-auto">
        <Input
          placeholder="Name"
          onChange={(e) =>
            setNewCharacteristic({ ...newCharacteristic, name: e.target.value })
          }
        />
        <Input
          placeholder="Value"
          onChange={(e) =>
            setNewCharacteristic({
              ...newCharacteristic,
              value: e.target.value,
            })
          }
        />
        <Input
          placeholder="Unit"
          onChange={(e) =>
            setNewCharacteristic({ ...newCharacteristic, unit: e.target.value })
          }
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
              {newCharacteristic.importance || "Select Importance"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {["High", "Medium", "Low"].map((importance) => (
              <DropdownMenuItem
                key={importance}
                onClick={() =>
                  setNewCharacteristic({ ...newCharacteristic, importance })
                }
              >
                {importance}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={handleAddCharacteristic}
          className="bg-green-800 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          Add Characteristic
        </Button>
      </div>
    </div>
  );
}

export default Characteristics;
