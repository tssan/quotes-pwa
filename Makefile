NODE_BIN?=./node_modules/.bin
SRC_PATH?=./src


.PHONY: install
install:
	@npm i

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: run
run:
	@cd $(SRC_PATH) && python -m SimpleHTTPServer 8010

.PHONY: quotes-api
quotes-api:
	@$(NODE_BIN)/json-server --watch quotes.json
