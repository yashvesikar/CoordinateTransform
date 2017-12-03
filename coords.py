#Yash Vesikar
#David Osinski
#ECE 280 Honors Option
#Coordinate Transform calculator w/ GUI

import math

class Cartesian:
    def __init__(self, x,y,z):
        self.x_pos = x
        self.y_pos = y
        self.z_pos = z

    def to_spherical(self):
        r = math.sqrt(math.pow(self.x_pos, 2) + math.pow(self.y_pos, 2) + math.pow(self.z_pos, 2))
        theta = math.atan2(self.y_pos, self.x_pos)
        phi = math.acos(self.z_pos / r)
        # ans = [r, theta, phi]
        # print(ans)
        return r, theta, phi

    def to_cylinder(self):
        p = math.sqrt(math.pow(self.x_pos, 2) + math.pow(self.y_pos, 2))
        phi = math.atan2(self.y_pos, self.x_pos)
        ans = [p, phi, self.z_pos]
        return p,phi,self.z_pos

    def to_cartesian(self):
        return self.x_pos, self.y_pos, self.z_pos

    def __str__(self):
        return "{},{},{}".format(self.x_pos, self.y_pos, self.z_pos)

class Spherical:
    def __init__(self, r, theta, phi):
        self.r = r
        self.theta = theta
        self.phi = phi

    def to_cartesian(self):
        x_pos = self.r * math.sin(self.phi) * math.cos(self.theta)
        y_pos = self.r * math.sin(self.phi) * math.sin(self.theta)
        z_pos = self.r * math.cos(self.phi)
        # ans = [x_pos, y_pos, z_pos]
        return x_pos, y_pos, z_pos

    def to_cylinder(self):
        p = self.r * math.sin(self.phi)
        phi = self.theta
        z_pos = self.r * math.cos(self.phi)
        # ans = [p, phi, z_pos]
        return p, phi, z_pos

    def to_spherical(self):
        return self.r, self.theta, self.phi

    def __str__(self):
        return "{},{},{}".format(self.r, self.theta, self.phi)


class Cylindrical:

    def __init__(self, p, theta, z_pos):
        self.p = p
        self.theta = theta
        self.z_pos = z_pos

    def to_cartesian(self):
        x_pos = self.p * math.cos(self.theta)
        y_pos = self.p * math.sin(self.theta)
        # ans = [x_pos, y_pos, self.z_pos]
        return x_pos, y_pos, self.z_pos

    def to_spherical(self):
        r = math.sqrt(math.pow(self.p, 2) + math.pow(self.z_pos, 2))
        phi = math.atan2(self.p, self.z_pos)
        # ans = [r, self.theta, phi]
        return r, self.theta, phi

    def to_cylindrical(self):
        return self.p, self.theta, self.z_pos

    def __str__(self):
        return "{},{},{}".format(self.r, self.theta, self.z_pos)


# test1 = cartesian(3,4,5)
# test2 = spherical(3,4,5)
# test3 = cylindrical(3,4,5)

# print test1.to_sphere()
# print test1.to_cylinder()
# print test2.to_cartesian()
# print test2.to_cylinder()
# print test3.to_cartesian()
# print test3.to_sphere()
