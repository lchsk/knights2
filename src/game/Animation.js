K.Animation = function(texture)
{
    // Current, minimum and maximum frames (for current animation)
    // this.minFrame = minFrame;
    // this.maxFrame = maxFrame;

    // Current frame
    this.frame = 0;

    // Current direction
    this.direction = "left";
    this.valid_direction = ["top", "right", "bottom", "left"];

    // side -> [frame_start, frame_end]
    this.sides = {};

    this.texture = texture;

    // That's a default fps, it can be read from the settings
    this.fps = 60;

};

K.Animation.prototype.constructor = K.Animation;

K.Animation.prototype.activate = function()
{
    this.frame = 0;
};

K.Animation.prototype.changeDirection = function(direction)
{
    if (this.valid_directions.indexOf(direction) >= 0)
    {
        this.direction = direction;
    }
}
