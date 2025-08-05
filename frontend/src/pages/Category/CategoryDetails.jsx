import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const CategoryDetails = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div>
            <Link to="/category/add">
              <Button>Add Category</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default CategoryDetails;
