from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Retrieve MySQL credentials
MYSQL_HOST = os.getenv("MYSQL_HOST")
MYSQL_USER = os.getenv("MYSQL_USER")
MYSQL_PASSWORD = os.getenv("MYSQL_PASSWORD")
MYSQL_DATABASE = os.getenv("MYSQL_DATABASE")
SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

# Initialize Flask app
app = Flask(__name__)

# MySQL Configuration
app.config["MYSQL_HOST"] = MYSQL_HOST
app.config["MYSQL_USER"] = MYSQL_USER
app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD
app.config["MYSQL_DB"] = MYSQL_DATABASE
app.config["SECRET_KEY"] = SECRET_KEY

mysql = MySQL(app)


@app.route("/test_db")
def test_db():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")
        cur.close()
        return "Database connection is working!"
    except Exception as e:
        return f"Database connection failed: {e}"


@app.route("/")
def index():
    return render_template("index.html")


# Plants CRUD
@app.route("/plants")
def plants():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Plants")
        data = cur.fetchall()
        cur.close()
        return render_template("plants.html", plants=data)
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
        return redirect(url_for("index"))


@app.route("/add_plant", methods=["POST"])
def add_plant():
    try:
        name = request.form["name"]
        scientific_name = request.form["scientific_name"]
        description = request.form["description"]
        origin = request.form["origin"]
        plant_type = request.form["type"]
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO Plants (name, scientific_name, description, origin, type) VALUES (%s, %s, %s, %s, %s)",
            (name, scientific_name, description, origin, plant_type),
        )
        mysql.connection.commit()
        cur.close()
        flash("Plant added successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("plants"))


@app.route("/delete_plant/<int:id>")
def delete_plant(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM Plants WHERE id = %s", [id])
        mysql.connection.commit()
        cur.close()
        flash("Plant deleted successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("plants"))


@app.route("/edit_plant/<int:id>")
def edit_plant(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Plants WHERE id = %s", [id])
        plant = cur.fetchone()
        cur.close()
        if plant:
            return render_template("edit_plant.html", plant=plant)
        else:
            flash("Plant not found!", "error")
            return redirect(url_for("plants"))
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
        return redirect(url_for("plants"))


# Characteristics CRUD
@app.route("/characteristics")
def characteristics():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Characteristics")
        data = cur.fetchall()
        cur.close()
        return render_template("characteristics.html", characteristics=data)
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
        return redirect(url_for("index"))


@app.route("/add_characteristic", methods=["POST"])
def add_characteristic():
    try:
        name = request.form["name"]
        value = request.form["value"]
        unit = request.form["unit"]
        importance = request.form["importance"]
        cur = mysql.connection.cursor()
        cur.execute(
            "INSERT INTO Characteristics (name, value, unit, importance) VALUES (%s, %s, %s, %s)",
            (name, value, unit, importance),
        )
        mysql.connection.commit()
        cur.close()
        flash("Characteristic added successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("characteristics"))


@app.route("/delete_characteristic/<int:id>")
def delete_characteristic(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM Characteristics WHERE id = %s", [id])
        mysql.connection.commit()
        cur.close()
        flash("Characteristic deleted successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("characteristics"))


@app.route("/edit_characteristic/<int:id>")
def edit_characteristic(id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Characteristics WHERE id = %s", [id])
        characteristic = cur.fetchone()
        cur.close()
        if characteristic:
            return render_template(
                "edit_characteristic.html", characteristic=characteristic
            )
        else:
            flash("Characteristic not found!", "error")
            return redirect(url_for("characteristics"))
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
        return redirect(url_for("characteristics"))


@app.route("/update_characteristic/<int:id>", methods=["POST"])
def update_characteristic(id):
    try:
        name = request.form["name"]
        value = request.form["value"]
        unit = request.form["unit"]
        importance = request.form["importance"]

        cur = mysql.connection.cursor()
        cur.execute(
            """
            UPDATE Characteristics 
            SET name = %s, value = %s, unit = %s, importance = %s 
            WHERE id = %s
            """,
            (name, value, unit, importance, id),
        )
        mysql.connection.commit()
        cur.close()
        flash("Characteristic updated successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("characteristics"))


# Associations CRUD
@app.route("/plant_characteristics")
def plant_characteristics():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT id, name FROM Plants")
        plants = cur.fetchall()
        cur.execute("SELECT id, name FROM Characteristics")
        characteristics = cur.fetchall()
        query = """
        SELECT Plants.name AS Plant, Characteristics.name AS Characteristic, PlantCharacteristics.note,
               PlantCharacteristics.plant_id, PlantCharacteristics.characteristic_id
        FROM PlantCharacteristics
        JOIN Plants ON PlantCharacteristics.plant_id = Plants.id
        JOIN Characteristics ON PlantCharacteristics.characteristic_id = Characteristics.id
        """
        cur.execute(query)
        associations = cur.fetchall()
        cur.close()
        return render_template(
            "plant_characteristics.html",
            plants=plants,
            characteristics=characteristics,
            plant_characteristics=associations,
        )
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
        return redirect(url_for("index"))


@app.route("/update_plant/<int:id>", methods=["POST"])
def update_plant(id):
    try:
        # Fetch form data
        name = request.form["name"]
        scientific_name = request.form["scientific_name"]
        description = request.form["description"]
        origin = request.form["origin"]
        plant_type = request.form["type"]

        # Update the plant in the database
        cur = mysql.connection.cursor()
        cur.execute(
            """
            UPDATE Plants
            SET name = %s, scientific_name = %s, description = %s, origin = %s, type = %s
            WHERE id = %s
            """,
            (name, scientific_name, description, origin, plant_type, id),
        )
        mysql.connection.commit()
        cur.close()

        flash("Plant updated successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("plants"))


@app.route("/add_association", methods=["POST"])
def add_association():
    try:
        plant_id = request.form["plant_id"]
        characteristic_id = request.form["characteristic_id"]
        note = request.form["note"]

        cur = mysql.connection.cursor()
        cur.execute(
            "SELECT * FROM PlantCharacteristics WHERE plant_id = %s AND characteristic_id = %s",
            (plant_id, characteristic_id),
        )
        existing_association = cur.fetchone()
        if existing_association:
            flash("This association already exists!", "error")
        else:
            cur.execute(
                "INSERT INTO PlantCharacteristics (plant_id, characteristic_id, note) VALUES (%s, %s, %s)",
                (plant_id, characteristic_id, note),
            )
            mysql.connection.commit()
            flash("Association added successfully!", "success")
        cur.close()
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("plant_characteristics"))


@app.route("/delete_association", methods=["POST"])
def delete_association():
    try:
        plant_id = request.form["plant_id"]
        characteristic_id = request.form["characteristic_id"]

        cur = mysql.connection.cursor()
        cur.execute(
            "DELETE FROM PlantCharacteristics WHERE plant_id = %s AND characteristic_id = %s",
            (plant_id, characteristic_id),
        )
        mysql.connection.commit()
        cur.close()
        flash("Association deleted successfully!", "success")
    except Exception as e:
        flash(f"An error occurred: {e}", "error")
    return redirect(url_for("plant_characteristics"))


if __name__ == "__main__":
    app.run(debug=True)
