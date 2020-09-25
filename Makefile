.PHONY: run cleanup

run: cleanup
	docker-compose up -d --build

cleanup:
	sudo rm -rf pgdata;
	docker-compose down;