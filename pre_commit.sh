#!/usr/bin/env bash
ROOT=${PWD}

set -e

yarn tsc --skipLibCheck
yarn eslint . --ext .js,.jsx,.ts,.tsx --fix
yarn pretty-quick --staged