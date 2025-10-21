import os
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives import hashes
import binascii

def generate_chrome_extension_id():
    os.system('cls')
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )

    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    print(private_pem.decode('utf-8').strip())

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
            # map 0-9 to a-j
            extension_id += chr(ord('a') + int(char))
        elif 'a' <= char <= 'f':
            # map a-f to k-p
            extension_id += chr(ord('k') + (ord(char) - ord('a')))
        else:
            # should not happen with a hex string
            raise ValueError(f"Unexpected character in hex string: {char}")

    print(f"\nExtension ID: {extension_id}")
    
    # save the private key
    user = input("\nSave key? (y/n): ")
    if user == "y":
        key_filename = "key.pem"
        with open(key_filename, "wb") as f:
            f.write(private_pem)
        print(f"Generated private key and saved to: {key_filename}\n")
    else:
        generate_chrome_extension_id()

if __name__ == "__main__":
    generate_chrome_extension_id()
