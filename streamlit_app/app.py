import streamlit as st
from db_helper import fetch_data, execute_query

# Sidebar Navigation
st.sidebar.title("Plant Database Management")
page = st.sidebar.selectbox(
    "Select Page", ["Home", "Plants", "Characteristics", "Associations"]
)

# Home Page
if page == "Home":
    st.title("Welcome to the Plant Database Management System")
    st.write(
        """
        This system allows you to efficiently manage a plant database. The main functionalities include:
        
        - **Plants**: View and manage plant information, including adding and deleting plants.
        - **Characteristics**: Define and manage plant characteristics such as height, color, and water requirements.
        - **Associations**: Link plants to their characteristics, manage relationships, and delete them if needed.
        
        Use the sidebar to navigate to the desired page.
        """
    )

# Plants Page
elif page == "Plants":
    st.title("Manage Plants")
    st.write(
        """
        This page allows you to manage plant-related data. You can:
        - View all plants currently in the database.
        - Add new plants, including details like scientific name, description, origin, and type.
        - Delete plants from the database.
        """
    )

    # Fetch and display plants
    plants = fetch_data("SELECT * FROM Plants")
    if plants:
        st.write("### Existing Plants:")
        for plant in plants:
            st.write(
                f"**{plant[1]} (ID = {plant[0]})** - {plant[2]} ({plant[3]}) [{plant[4]}]"
            )
    else:
        st.write("No plants found.")

    # Add new plant
    with st.form("Add Plant"):
        st.write("### Add a New Plant")
        name = st.text_input("Name")
        scientific_name = st.text_input("Scientific Name")
        description = st.text_area("Description")
        origin = st.text_input("Origin")
        plant_type = st.selectbox(
            "Type", ["Flower", "Tree", "Shrub", "Herb", "Cactus", "Other"]
        )
        if st.form_submit_button("Add Plant"):
            execute_query(
                "INSERT INTO Plants (name, scientific_name, description, origin, type) VALUES (%s, %s, %s, %s, %s)",
                (name, scientific_name, description, origin, plant_type),
            )
            st.success("Plant added successfully!")
            st.rerun()

    # Delete plant
    st.write("### Delete a Plant:")
    plant_id_to_delete = st.number_input("Plant ID to Delete", min_value=1, step=1)
    if st.button("Delete Plant"):
        execute_query("DELETE FROM Plants WHERE id = %s", (plant_id_to_delete,))
        st.success("Plant deleted successfully!")
        st.rerun()

# Characteristics Page
elif page == "Characteristics":
    st.title("Manage Characteristics")
    st.write(
        """
        This page allows you to manage plant characteristics. You can:
        - View all defined characteristics.
        - Add new characteristics.
        - Delete characteristics from the database.
        """
    )

    # Fetch and display characteristics
    characteristics = fetch_data("SELECT * FROM Characteristics")
    if characteristics:
        st.write("### Existing Characteristics:")
        for char in characteristics:
            st.write(
                f"**{char[1]} (ID = {char[0]})** - {char[2]} (Value), {char[3]} (Unit), {char[4]} (Importance)"
            )
    else:
        st.write("No characteristics found.")

    # Add new characteristic
    with st.form("Add Characteristic"):
        st.write("### Add a New Characteristic")
        name = st.text_input("Name")
        value = st.text_input("Value")
        unit = st.text_input("Unit")
        importance = st.selectbox("Importance", ["High", "Medium", "Low"])
        if st.form_submit_button("Add Characteristic"):
            execute_query(
                "INSERT INTO Characteristics (name, value, unit, importance) VALUES (%s, %s, %s, %s)",
                (name, value, unit, importance),
            )
            st.success("Characteristic added successfully!")
            st.rerun()

    # Delete characteristic
    st.write("### Delete a Characteristic:")
    characteristic_id_to_delete = st.number_input(
        "Characteristic ID to Delete", min_value=1, step=1
    )
    if st.button("Delete Characteristic"):
        execute_query(
            "DELETE FROM Characteristics WHERE id = %s", (characteristic_id_to_delete,)
        )
        st.success("Characteristic deleted successfully!")
        st.rerun()

# Associations Page
elif page == "Associations":
    st.title("Manage Plant-Characteristic Associations")
    st.write(
        """
        This page allows you to manage the relationships between plants and their characteristics. You can:
        - View all existing associations.
        - Add new associations.
        - Delete associations from the database.
        """
    )

    # Fetch plants and characteristics
    plants = fetch_data("SELECT id, name FROM Plants")
    characteristics = fetch_data("SELECT id, name FROM Characteristics")

    # Display associations
    associations = fetch_data(
        """
        SELECT Plants.name, Characteristics.name, PlantCharacteristics.note,
               PlantCharacteristics.plant_id, PlantCharacteristics.characteristic_id
        FROM PlantCharacteristics
        JOIN Plants ON PlantCharacteristics.plant_id = Plants.id
        JOIN Characteristics ON PlantCharacteristics.characteristic_id = Characteristics.id
        """
    )
    st.write("### Existing Associations:")
    if associations:
        for assoc in associations:
            st.write(
                f"**Plant:** {assoc[0]} (ID = {assoc[3]}) - "
                f"**Characteristic:** {assoc[1]} (ID = {assoc[4]}) - "
                f"**Note:** {assoc[2]}"
            )
    else:
        st.write("No associations found.")

    # Display two tables side by side for plants and characteristics
    col1, col2 = st.columns(2)

    with col1:
        st.write("### Available Plants and Their IDs")
        if plants:
            for plant in plants:
                st.write(f"- **ID {plant[0]}**: {plant[1]}")
        else:
            st.write("No plants found.")

    with col2:
        st.write("### Available Characteristics and Their IDs")
        if characteristics:
            for characteristic in characteristics:
                st.write(f"- **ID {characteristic[0]}**: {characteristic[1]}")
        else:
            st.write("No characteristics found.")

    # Add new association
    st.write("### Add a New Association")
    with st.form("Add Association"):
        st.write(
            """
            Use the IDs above to create an association:
            - **Plant ID**: Represents a specific plant in the database.
            - **Characteristic ID**: Represents a specific characteristic in the database.
            """
        )
        plant_id = st.number_input("Plant ID", min_value=1, step=1)
        characteristic_id = st.number_input("Characteristic ID", min_value=1, step=1)
        note = st.text_area("Note")
        if st.form_submit_button("Add Association"):
            execute_query(
                "INSERT INTO PlantCharacteristics (plant_id, characteristic_id, note) VALUES (%s, %s, %s)",
                (plant_id, characteristic_id, note),
            )
            st.success("Association added successfully!")
            st.rerun()

    # Delete association
    st.write("### Delete an Association")
    plant_id_to_delete = st.number_input(
        "Plant ID (for association)", min_value=1, step=1
    )
    characteristic_id_to_delete = st.number_input(
        "Characteristic ID (for association)", min_value=1, step=1
    )
    if st.button("Delete Association"):
        execute_query(
            "DELETE FROM PlantCharacteristics WHERE plant_id = %s AND characteristic_id = %s",
            (plant_id_to_delete, characteristic_id_to_delete),
        )
        st.success("Association deleted successfully!")
        st.rerun()
