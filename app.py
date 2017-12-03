from flask import Flask, render_template, request, jsonify
from coords import *

app = Flask(__name__)

@app.route('/transform',methods=['POST', 'GET'])
def transform():
    """ Transforms input coordinates and returns transformed coordinates

        Args: GET requst containing \{x,y,z,from_system, to_system}

        Return: appropriate coordinates as floats
    """
    print("REQUEST: ",request.args)
    old_x = request.args.get('x', 0, type=float)
    old_y = request.args.get('y', 0, type=float)
    old_z = request.args.get('z', 0, type=float)
    from_system = request.args.get('from_system', "cartesian", type=str)
    to_system = request.args.get('to_system', "cartesian", type=str)

    # Creates an instance of the current coordinate system
    if(from_system == "cartesian"):
        system = Cartesian(old_x,old_y,old_z)
    elif(from_system == "cylindrical"):
        system = Cylindrical(old_x,old_y,old_z)
    elif(from_system == "spherical"):
        system = Spherical(old_x,old_y,old_z)

    # new_x,new_y,new_z = old_x,old_y,old_z
    # Transforms current system into new system
    if(to_system == "cartesian"):
        new_x,new_y,new_z = system.to_cartesian()
    elif(to_system == "cylindrical"):
        new_x,new_y,new_z = system.to_cylinder()
    elif(to_system == "spherical"):
        new_x,new_y,new_z = system.to_spherical()


    return jsonify(x=new_x,y=new_y,z=new_z, system=to_system)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
