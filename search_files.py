#!/usr/bin/env python3
import os
import glob
from pathlib import Path
import platform

def search_files():
    search_terms = ['H0PE', 'h0pe', '社内報']
    extensions = ['.pptx', '.pdf']
    found_files = []
    
    # Detect if running on Windows or WSL/Linux
    is_windows = platform.system() == 'Windows'
    
    if is_windows:
        # Windows paths (for MINGW64/Git Bash/Windows)
        search_paths = [
            'D:/*',  # D drive root
            'D:/*/Documents',
            'D:/*/Desktop',
            'D:/*/Downloads'
        ]
    else:
        # WSL/Linux paths
        search_paths = [
            '/mnt/d/*',
            '/mnt/d/*/Documents',
            '/mnt/d/*/Desktop',
            '/mnt/d/*/Downloads'
        ]
    
    print(f"Running on: {platform.system()}")
    print("Searching for files containing 'H0PE' or '社内報'...")
    print("Search location: D drive only")
    print("-" * 50)
    
    for search_path in search_paths:
        for ext in extensions:
            for term in search_terms:
                # Case-insensitive search
                pattern1 = f"{search_path}/**/*{term}*{ext}"
                pattern2 = f"{search_path}/*{term}*{ext}"
                
                try:
                    matches1 = glob.glob(pattern1, recursive=True)
                    matches2 = glob.glob(pattern2, recursive=False)
                    
                    for match in matches1 + matches2:
                        if match not in found_files:
                            found_files.append(match)
                            file_size = os.path.getsize(match) / (1024 * 1024)  # MB
                            print(f"Found: {match}")
                            print(f"  Size: {file_size:.2f} MB")
                            print()
                except Exception as e:
                    continue
    
    if not found_files:
        print("No files found with 'H0PE' or '社内報' in the name.")
    else:
        print(f"\nTotal files found: {len(found_files)}")
    
    return found_files

if __name__ == "__main__":
    search_files()