#!/bin/bash

generateStatistics() {
    grep -Eo "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}\b" |
        sort |
        uniq -c
}

generateBlameFinalContribution() {
    while read FILE_NAME; do
        git blame "$FILE_NAME" --show-email
    done
}

getFileRelativePaths() {
    FILE_PATH=$1
    REGEX=$2
    find "$FILE_PATH" -type f | grep -E $REGEX
}

getFileRelativePaths $1 $2 |
    generateBlameFinalContribution |
    generateStatistics
