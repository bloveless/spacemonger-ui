publish:
	docker buildx build --platform linux/arm64 -f Dockerfile -t bloveless/spacemonger-ui:0.1.0-alpha.4 --push .

