#!/usr/bin/env bash

set -e

# Exit early if no branch found
if [[ -z ${1} ]]; then
  echo "No branch found, received >> ${1} <<"
  exit 1
fi

if [[ "${1}" == "${PRODUCTION_BRANCH}" ]]; then
  echo "production"
else
  echo "${1}"
fi
