.PHONY: run cleanup

run: cleanup
	docker-compose up -d --build --force-recreate

cleanup:
	sudo rm -rf pgdata;
	docker-compose down;