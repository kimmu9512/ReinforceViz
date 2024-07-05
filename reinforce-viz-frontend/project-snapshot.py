import os
import fnmatch
import readline

# Configuration
root_dir = './'
output_file = 'project_snapshot_output.txt'
allowed_extensions = ['.php', '.js', '.css', '.html', '.json', '.txt', '.py', '.txt', '.md']  # Add or remove as needed
ignore_files = [
    'project-snapshot.py',
    'node_modules',
    'package.json',
    'package-lock.json',
    '.git',
    'project_snapshot_output.txt'  # Ignore the output file itself
]

def is_ignored(file_path):
    relative_path = os.path.relpath(file_path, root_dir)
    
    # Check if the file or any of its parent directories should be ignored
    path_parts = relative_path.split(os.path.sep)
    for i in range(len(path_parts)):
        if any(fnmatch.fnmatch(os.path.join(*path_parts[:i+1]), pattern) for pattern in ignore_files):
            return True
    
    # Check .gitignore if it exists
    gitignore_path = os.path.join(root_dir, '.gitignore')
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            gitignore_patterns = f.read().splitlines()
        
        for pattern in gitignore_patterns:
            if pattern and not pattern.startswith('#'):
                if fnmatch.fnmatch(relative_path, pattern):
                    return True
    
    return False

def generate_directory_tree(dir_path, prefix=''):
    tree = ''
    entries = list(os.scandir(dir_path))
    
    for index, entry in enumerate(entries):
        if is_ignored(entry.path):
            continue
        
        is_last = index == len(entries) - 1
        marker = '└── ' if is_last else '├── '
        new_prefix = prefix + ('    ' if is_last else '│   ')
        
        tree += f"{prefix}{marker}{entry.name}\n"
        
        if entry.is_dir():
            tree += generate_directory_tree(entry.path, new_prefix)
    
    return tree

def compile_project(dir_path, output):
    for root, dirs, files in os.walk(dir_path):
        dirs[:] = [d for d in dirs if not is_ignored(os.path.join(root, d))]
        
        for file in files:
            file_path = os.path.join(root, file)
            if is_ignored(file_path):
                continue
            
            _, ext = os.path.splitext(file)
            if ext in allowed_extensions:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                output.write(f"\n\n--- File: {file_path} ---\n\n")
                output.write(content)

def prompt_user(question):
    return input(question).lower() == 'y'

def main():
    include_directory_structure = prompt_user('Include directory structure? (y/n): ')
    include_file_contents = prompt_user('Include file contents? (y/n): ')

    with open(output_file, 'w', encoding='utf-8') as output:
        output.write('Project Code Transcript\n\n')

        if include_directory_structure:
            output.write('Directory Structure:\n\n')
            output.write(generate_directory_tree(root_dir))
            output.write('\n')

        if include_file_contents:
            output.write('File Contents:\n')
            compile_project(root_dir, output)

    print(f"Transcript compiled to {output_file}")

if __name__ == "__main__":
    main()