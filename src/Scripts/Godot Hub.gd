extends Control

# Called when the node enters the scene tree for the first time.
func _ready():
	$HTTPRequest.request("https://downloads.tuxfamily.org/godotengine/")

func _on_HTTPRequest_request_completed(result, response_code, headers, body):
	var data = body.get_string_from_utf8()
	$RichTextLabel.text = data