from sqlalchemy import create_engine, Column, Integer, String, Text, LargeBinary, ForeignKey, UniqueConstraint
from sqlalchemy.orm import declarative_base, sessionmaker
import json
import os
import base64

Base = declarative_base()

# Define the UserHistory model


class UserHistory(Base):
    __tablename__ = 'user_history'
    id = Column(Integer, primary_key=True, autoincrement=True)
    jwt_token = Column(String, nullable=False)
    transaction_id = Column(String, nullable=False)
    site_content = Column(Text, nullable=False)
    image = Column(LargeBinary, nullable=True)

    __table_args__ = (UniqueConstraint(
        'jwt_token', 'transaction_id', name='unique_transaction_per_token'),)

# Initialize the database


def initialize_db():
    engine = create_engine("sqlite:///user_history.db")
    Base.metadata.create_all(engine)
    return sessionmaker(bind=engine)

# Delete all records from the table


def delete_all_records(session):
    session.query(UserHistory).delete()
    session.commit()
    print("All records deleted successfully.")

# Store user history


def store_data(session, jwt_token, transaction_id, site_content, image_path=None):
    image_data = None
    if image_path:
        with open(image_path, "rb") as img_file:
            image_data = img_file.read()

    new_entry = UserHistory(jwt_token=jwt_token, transaction_id=transaction_id,
                            site_content=json.dumps(site_content), image=image_data)
    try:
        session.add(new_entry)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error storing data: {e}")

# Get all history by jwt_token


def get_all_history(session, jwt_token):
    all_history = session.query(UserHistory).filter_by(
        jwt_token=jwt_token).all()
    data = []
    for record in all_history:
        data.append({"transaction_id": record.transaction_id,
                     "site_content": json.loads(record.site_content), "image": base64.b64encode(record.image).decode("utf-8")})
        print(record.transaction_id, json.loads(record.site_content))
    return data

# Example usage
# if __name__ == "__main__":
    # Session = initialize_db()
    # session = Session()

    # Store some sample data
    # store_data(session, "unique_jwt_token_1", "txn_123457", {"page": "home_1", "timestamp": "2025-02-08"}, r"D:\hackthon\Frosthacks_Meteors\backend\output\uploaded_image.png")
    # store_data(session, "unique_jwt_token", "txn_12346", {"page": "dashboard", "timestamp": "2025-02-09"}, "example.jpg")

    # Retrieve a specific transaction
    # history = get_history(session, "txn_12345")
    # print(history.site_content if history else "No record found")

    # Retrieve all history for a specific token
    # all_history = get_all_history(session, "unique_jwt_token_1")
    # for record in all_history:
    #     print(record.transaction_id, record.site_content)

    # Delete all records (uncomment to use)
    # delete_all_records(session)

    # Delete database (uncomment to use)
    # delete_database()
