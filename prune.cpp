#include <iostream>
#include <fstream>
#include <sstream>
#include <unordered_map>
#include <vector>
#include <nlohmann/json.hpp>
#include <cctype>

using json = nlohmann::json;
using namespace std;

// Function to process the TSV file and generate JSON
void convertTSVtoJSON(const string &tsvFile, const string &jsonFile) {
    ifstream infile(tsvFile);
    if (!infile) {
        cerr << "Error opening file: " << tsvFile << endl;
        return;
    }

    unordered_map<string, vector<string>> crosswordData;
    string line, source, year, answer, clue;

    while (getline(infile, line)) {
        istringstream ss(line);
        if (!(ss >> source >> year >> answer)) continue; // Read first three columns
        getline(ss, clue); // Read the remaining clue text
        if (!clue.empty() && clue[0] == '\t') clue = clue.substr(1); // Remove leading tab if present

        string lowerAnswer = "";
        bool shouldBreak = false;
        for (int i = 0; i < answer.length(); i++) {
            if (answer[i] <= 'Z' && answer[i] >= 'A') {
                lowerAnswer += answer[i] + 32;
            } else {
                shouldBreak = true;
                break;
            }
        }
        if (shouldBreak) {
            continue;
        }

        crosswordData[lowerAnswer].push_back(clue);
    }

    infile.close();

    // Convert to JSON and write to file
    ofstream outfile(jsonFile);
    if (!outfile) {
        cerr << "Error creating file: " << jsonFile << endl;
        return;
    }

    json jsonData(crosswordData);
    outfile << jsonData.dump(4); // Pretty-print with indentation
    outfile.close();

    cout << "JSON file created successfully: " << jsonFile << endl;
}

int main() {
    string tsvFile = "clues.tsv"; // Input TSV file
    string jsonFile = "crosswordData.json"; // Output JSON file

    convertTSVtoJSON(tsvFile, jsonFile);
    return 0;
}
