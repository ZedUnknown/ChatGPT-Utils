from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend
import os

def extract_public_key(private_key_pem_string):
    os.system('cls')
    """
    Extracts the public key from a given private key PEM string.

    Args:
        private_key_pem_string (str): The private key in PEM format (string).

    Returns:
        str: The extracted public key in PEM format, or None if an error occurs.
    """
    try:
        # Load the private key from the PEM string
        private_key = serialization.load_pem_private_key(
            private_key_pem_string.encode('utf-8'), # Convert string to bytes
            password=None, # Assuming no password on the private key
            backend=default_backend()
        )

        # Get the public key from the private key object
        public_key = private_key.public_key()

        # Serialize the public key to PEM format
        public_key_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode('utf-8') # Convert bytes back to string

        return public_key_pem
    except Exception as e:
        print(f"Error extracting public key: {e}")
        return None

with open("./key.pem", "r") as key_file:
    your_private_key_string = key_file.read()

# Call the function to extract the public key
extracted_public_key = extract_public_key(your_private_key_string)

if extracted_public_key:
    print("\n--- Extracted Public Key ---")
    print(extracted_public_key)
    print("----------------------------")
    print("Copy the entire content above (including BEGIN/END PUBLIC KEY lines) and paste it into the Chrome Web Store.")
else:
    print("Failed to extract the public key.")