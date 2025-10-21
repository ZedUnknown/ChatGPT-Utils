import os
from cryptography.hazmat.primitives.asymmetric import rsa, ec
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
import binascii

def validate_key(pem_filepath: str) -> str:
    if not os.path.exists(pem_filepath):
        raise FileNotFoundError(f"PEM file not found at: {pem_filepath}")

    try:
        # read the private key from the .pem file
        with open(pem_filepath, "rb") as f:
            private_pem_data = f.read()

        # load the private key (supports RSA and potentially EC keys if needed)
        private_key = serialization.load_pem_private_key(
            private_pem_data,
            password=None
        )

        # extract the public key in DER format
        public_key = private_key.public_key()
        public_der = public_key.public_bytes(
            encoding=serialization.Encoding.DER,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        )

        # calculate the SHA256 hash of the public key (DER format)
        hasher = hashes.Hash(hashes.SHA256())
        hasher.update(public_der)
        hash_digest = hasher.finalize()

        # take the first 16 bytes (32 hex characters) of the hash
        truncated_hash_hex = binascii.hexlify(hash_digest[:16]).decode('ascii')

        # translate hexadecimal characters (0-9, a-f) to base32 (a-p)
        extension_id = ""
        for char in truncated_hash_hex:
            if '0' <= char <= '9':
                # Map 0-9 to a-j
                extension_id += chr(ord('a') + int(char))
            elif 'a' <= char <= 'f':
                # Map a-f to k-p
                extension_id += chr(ord('k') + (ord(char) - ord('a')))
            else:
                raise ValueError(f"Unexpected character '{char}' in hexadecimal hash.")

        return extension_id

    except Exception as e:
        raise ValueError(f"Error processing PEM file: {e}")

if __name__ == "__main__":
    os.system('cls')
    pem_file_path = input("Enter the path to the .pem file: ")

    try:
        derived_id = validate_key(pem_file_path)
        print(f"\n--- Validation Result ---")
        print(f"PEM File: {pem_file_path}")
        print(f"Derived Chrome Extension ID: {derived_id}")
        print(f"-------------------------\n")
        
    except (FileNotFoundError, ValueError) as e:
        print(f"Error: {e}")