ui_tag = 0.1.0-alpha.11

publish:
	docker build --platform linux/arm64 -f Dockerfile -t bloveless/spacemonger-ui:$(ui_tag) .
	docker push bloveless/spacemonger-ui:$(ui_tag)
